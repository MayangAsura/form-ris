import { forwardRef, useImperativeHandle } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { isPending } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import supabase from '../client/supabase_client'

const PengukuranSeragam = forwardRef((props, ref) => {
    const [schoolUniformModel_, setSchoolUniformModel_] = useState({})
    const [applicantUniformSC, setApplicantUniformSC] = useState([])
    const [applicantUniformSCData, setApplicantUniformSCData] = useState([])
    const [participant_id, setParticipantId] = useState([])
    const [tableData, setTableData] = useState([])
    const [formData, setFormData] = useState({})
    const [formModels, setFormModels] = useState([])
    const [last_update, setLastUpdate] = useState("")
    const sectionRef = useRef(null)

    const {dataSeragam, schoolUniformModel} = props
    useEffect(() => {
        // console.log('ref', ref)
        getSchoolUniformModel(props.participant)
        console.log('formData', props.dataSeragam, schoolUniformModel)
        if(props.dataSeragam.length > 0){
            setApplicantUniformSC(props.dataSeragam)
            setLastUpdate(props.dataSeragam[0].updated_at)
        }
        if(props.schoolUniformModel.length > 0){
            setSchoolUniformModel_(props.schoolUniformModel)
        }
        if(formModels){
            setApplicantUniformSC(formModels)
        }

        console.log('props.participant',props.participant)
        props.participant? setParticipantId(props.participant): ""
    },[formModels])

    useImperativeHandle(ref, () => ({
        scrollTo: () => {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }));

    const models = []

    const getSchoolUniformModel = async (pid) => {
        const { data, err} = await supabase.from('participant_size_charts')
                        .select('uniform_model_id, size_chart, updated_at')
                        .eq('participant_id', pid)
                        .is('deleted_at', null)
                        // .single()
        if(err){
        ////console.log(err)
            return
        }

        setSchoolUniformModel_(data)
    }

    // const saveData = (e) => {
    //     e.preventDefault()
    //     console.log('formData >', e)

    //     // for
    //     formData.map((i, key) => {

    //         models.push({
    //             uniform_model_id: i,
    //             participant_id: participant_id,
    //             size_chart: i.value()
    //         });
    //     })
    //     for (let i in formData) {
    //         const x = e.target[i];
    //             const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
            
    //     //         console.log('checkedRadios', checkedRadios)
    //     //         checkedRadios.forEach(radio => {
    //     // });
    //     // models.push({
    //     //         uniform_model_id: i,
    //     //         participant_id: participant_id,
    //     //         size_chart: i
    //     //     });
    //         // if(x.checked){
    //             // models.push({
    //             // uniform_model_id: i.name,
    //             // participant_id: participant_id,
    //             // size_chart: i.value
    //         // })
    //         // }     
    //     }
    //     console.log('models', models)
    //     // console.log('formData>', formData)
    //     //console.log('applicantUniformSCData>', applicantUniformSCData)
    //     props.onSubmit(models)
        
    //     // generateUniformModelForm()
        
    // }
    
    const saveData = (e) => {
        e.preventDefault()
        
        
        // Get all checked radio buttons
        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
        checkedRadios.forEach(radio => {
            formModels.push({
                uniform_model_id: radio.name,
                participant_id: participant_id,
                size_chart: radio.value
            });
        });
        console.log('formModels', formModels)
        
        setTimeout(() => {
            
            props.onSubmit(formModels)
        }, 1000);
    }

    const handleRadioChange = (model_id, size) => {
        setFormData(prev => ({
            ...prev,
            [model_id]: size
        }));
    }

    const formatDate = (date)    => {
        const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        date = new Date(date);
        const dayName = dayNames[date.getDay()];
        const day = date.getDate();
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');

        return `${dayName}, ${day} ${monthName} ${year} ${hour}:${minute} WIB`;
    }

    // Render table using React components instead of HTML strings
    const renderUniformTable = () => {
        if (!schoolUniformModel_.length) return null;

        return schoolUniformModel_
            .filter(m => props.gender === m.model_gender && props.school === m.school_id)
            .map(m => {
                const model_size_charts = JSON.parse(m.model_size_charts);
                const firstObjectKey = Object.keys(model_size_charts)[0];
                const firstObject = model_size_charts[firstObjectKey];
                const measurementKeys = Object.keys(firstObject);

                // Find existing selection for this model
                const existingSelection = dataSeragam?.find(item => item.uniform_model_id === m.id);
                const existingSelectionInput = formModels?.find(item => item.uniform_model_id === m.id);

                return (
                    <div key={m.id} className="mb-8">
                        <table className="w-full ">
                            <thead>
                                <tr>
                                    <th colSpan={measurementKeys.length + 1} className="  p-3 bg-white">
                                        <div className="flex flex-col gap-3 items-start mb-3">
                                            <span className="text-lg font-semibold">{m.model_name}<span className="text-red-600">*</span></span>
                                            <img src={m.model_url} alt={m.model_name} className="w-52 h-52 object-cover mr-4" />
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-start">Ukuran</th>
                                    {/* border border-gray-300 p-2 bg-gray-50 */}
                                    {measurementKeys.map(key => (
                                        <th key={key} className="">{key}</th>
                                        // border border-gray-300 p-2 bg-gray-50
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(model_size_charts).map(([size, measurements]) => {
                                    const value = existingSelectionInput?.size_chart === size
                                    const inputValue = existingSelection?.size_chart === size
                                    const newValue = formData[m.id] == size
                                    const isChecked = newValue || (!formData[m.id] && (value || inputValue)) ;
                                    return (
                                        <tr key={size} className=""> 
                                        {/* hover:bg-gray-50 */}
                                            <td className="  p-2">
                                                {/* border border-gray-300 */}
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name={m.id}
                                                        value={size}
                                                        checked={isChecked}
                                                        onChange={() => handleRadioChange(m.id, size)}
                                                        className="mr-2 form-input text-gray-800"
                                                    />
                                                    {size}
                                                </label>
                                            </td>
                                            {measurementKeys.map(key => (
                                                <td key={key} className=" p-2 text-center">
                                                    {/* border border-gray-300 */}
                                                    {measurements[key]}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            });
    }

    return (
        <section ref={sectionRef} id="pengukuran_seragam" className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6 '>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form onSubmit={saveData} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-3xl font-semibold text-gray-900">Pengukuran Seragam</h2>
                                    <p className="mt-1 text-sm/6 text-gray-600 italic">
                                        Perhatikan ukuran sesuai dengan tabel ukuran seragam. 
                                    </p>
                                    <p className="mt-1 text-sm/12 text-gray-600">
                                        Update terakhir: {last_update ? formatDate(last_update) : '-'}.
                                    </p>

                                    <div className="border-b border-gray-900/20 py-3"></div>

                                    <div className="flex flex-col">
                                        {renderUniformTable()}
                                        
                                        {schoolUniformModel_.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                Belum ada data ukuran seragam
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className='flex justify-center text-center my-5'>
                                        {/* {!props.complete && ( */}
                                            <button 
                                                type="submit" 
                                                className='btn w-full py-3 block btn-sm text-gray-200 bg-green-900 hover:bg-gray-800' 
                                                // onClick={saveData_}
                                                disabled={props.isPending}
                                            >
                                                {/* {(props.isPending || props.loading)? (
                                                    <div className="flex items-center justify-center">
                                                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Menyimpan...
                                                    </div>
                                                // ) 
                                                : 
                                                 */}
                                                 {(dataSeragam.length>0 || formModels.length>0)? 'Edit': 'Simpan'}
                                                    {/* :  */}
                                                    {/* Simpan */}
                                                
                                                {/* } */}
                                            </button>
                                        {/* )} */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default PengukuranSeragam;
// import { forwardRef } from 'react'
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
// import { isPending } from '@reduxjs/toolkit'
// // import e from 'cors'
// import { useEffect, useRef, useState } from 'react'
// import { json } from 'react-router-dom'
// // import { ChevronDownIcon } from '@heroicons/react/16/solid'

// const PengukuranSeragam = forwardRef((props, ref) => {
//     const [schoolUniformModel, setSchoolUniformModel] = useState({})
// // {model_gender:"", model_name:"", model_size_chart:"", model_url: "", school_id: ""}
// // {uniform_model_id:"", size_chart:""}
//     const [applicantUniformSC, setApplicantUniformSC] = useState([])
//     const [applicantUniformSCData, setApplicantUniformSCData] = useState([])
//     const [participant_id, setParticipantId] = useState([])
//     const [tableData, setTableData] = useState([])
//     const [formData, setFormData] = useState({})
    
//     const [last_update, setLastUpdate] = useState("")
//     // const [father_academic, setFatherAcademic] = useState("")
//     // const [father_job, setFatherJob] = useState("")
//     // const [father_salary, setFatherSalary] = useState("")
//     // const [why_chooses, setWhyChooses] = useState("")
//     // const [last_update, setLastUpdate] = useState("")

//     // const data = { father_name:father_name, father_academic:father_academic, father_job:father_job, father_salary:father_salary, why_chooses:why_chooses}

//     useEffect(() => {
//         console.log('ref,', ref)
//         // //console.log('props.dataAyah>', props.dataAyah)
//         // setFatherName(props.dataAyah?.father_name)
//         // setFatherAcademic(props.dataAyah?.father_academic)
//         // setFatherSalary(props.dataAyah?.father_salary)
//         // setFatherJob(props.dataAyah?.father_job)
//         // setWhyChooses(props.dataAyah?.why_chooses)
//         // setLastUpdate(props.dataAyah?.updated_at)
//         if(props.dataSeragam.length > 0){
//             setApplicantUniformSC(props.dataSeragam)
//             setLastUpdate(props.dataSeragam[0].updated_at)
//         }
//         if(props.schoolUniformModel.length > 0){
//             setSchoolUniformModel(props.schoolUniformModel)
//             generateUniformModelForm()
//             //console.log('setSchoolUniformModel', setSchoolUniformModel)
            
//         }

//         props.participant? setParticipantId(props.participant): ""
//         // props.pengSeragamRef(peng_seragam)
//     },[props.dataSeragam, props.schoolUniformModel, props.gender, props.participant])
//     const models = []
//     const saveData = (e) => {
//         e.preventDefault()
//         // //console.log('e >', e)
//         for (let i = 0; i < 23; i++) {
//             const x = e.target[i];

//             if(x.checked){models.push({
//                 uniform_model_id: x.name,
//                 participant_id: participant_id,
//                 size_chart: x.value
//             })}     
//         }
//         //console.log(models)
//         //console.log('formData>', formData)
//         //console.log('applicantUniformSCData>', applicantUniformSCData)
//         props.onSubmit(models)
        
//         generateUniformModelForm()
        
//     }

//     const generateUniformModelForm = () => {
//         var data = ''
//         var subdata = ''
//         var size = ''
//         // const newd = {"xs": {
//         //     "PB": 65,
//         //     "LB": 32,
//         //     "TB": 45,
//         //     "PT": 23
//         // }, "s": {
//         //     "PB": 68,
//         //     "LB": 35,
//         //     "TB": 47,
//         //     "PT": 25
//         // }}
//         // setSchoolUniformModel(newd)
//         for (let index = 0; index < schoolUniformModel.length; index++) {
//             const m = schoolUniformModel[index];
//             // data += '<form action="" onSubmit={saveData}>'
//             // //console.log(props.gender)
//             if(props.gender == m.model_gender && props.school == m.school_id){

//                 data  += `<tr>
//                 <td><img src=${m.model_url} alt=""  /></td>
                
//                 </tr>
//                 <tr>
//                                                         <th>${m.model_name}<span className="text-red-600">*</span></th>`
//                                                     console.log('model_size_charts',m.id, JSON.parse(m.model_size_charts))
//                                                     console.log('model_size_charts',m.id, JSON.parse(m.model_size_charts))
                                                    
//                                                     const model_size_charts = JSON.parse(m.model_size_charts)
//                                                     console.log('model>', Object.keys(model_size_charts)[0])
//                                                     let label = ''
//                                                         // Object.keys(
//                                                         //     model_size_charts
//                                                         // //  Object.keys(model_size_charts)[0]
//                                                         // )[0].map((item) => 
//                                                             // )
//                                                         for (let key in model_size_charts[Object.keys(model_size_charts)[0]]){
                                                            
//                                                                 console.log('value>', key),
//                                                                 label +=`<th class="px-3">${key}</th>`
//                                                         }
                                                        

//                                                         // <th class="px-3">LD</th>
//                                                         // <th class="px-3">LP</th>
//                                                         // <th class="px-3">PT</th>
//                                                     data += label 
//                                                     data + `</tr>
//                                                     `

//                 // const keys
//                 for (let key in model_size_charts) {
//                     // const  = model_size_charts[index];
//                     const checked = props.dataSeragam[index]?.uniform_model_id== m.id && props.dataSeragam[index]?.size_chart==key?'checked':''
//                     //console.log(props.dataSeragam[index].uniform_model_id, props.dataSeragam[index].size_chart)
//                     //console.log(checked)
//                 // //console.log(key, model_size_charts[key]);
//                 // const s = Object.keys(model_size_charts)[i];
//                         subdata += `
//                         <tr className='flex flex-row justify-start items-center'>
//                         <th class='text-start'><input type="radio" name="`+m.id+`" value="${key}" onchange="`+setValue(m.id, key)+`" ${checked}  class='form-input text-gray-800 text-start' /><label htmlFor="XXXS" className='block text-medium text-gray-900'> ${key}</label></th>`
//                         // for (let index = 0; index < model_size_charts[key].length; index++) {
//                         // const s = model_size_charts[key][].value();

                        
//                         // Object.values(Object.values(key)).map((e)=>{
//                             // })
//                         for (let val in Object.values(key)){
                                
//                                     console.log('e>',e)
//                                      size += `<td class="px-3">${e}</td>`
//                         }

                        
//                         // key.map((e, k) => {
                            
//                         //     size += `<td class="px-3">${Object.keys(key).values()[k]}</td>`
//                         // })
//                     // } 
//                     subdata += size
//                     size=""
//                     //    model_size_charts[key].forEach(s => {
//                         //     });
//                         subdata +=`</tr>`
//                     }
                    
                    
//                     data += subdata
//                     subdata=""  
//             }
//             // else
//             // {
//             //     data += "Belum ada data ukuran seragam"
//             // }
//         }
        
//         setTableData(data)
//     }


//     const setValue = (model_id, size) => {
//         // //console.log(e)
//         // const { name, value } = e;
//         // //console.log(e.target)
//         // setFormData((prevState) => ({ ...prevState, [name]: value }));
//         const data = {
//             uniform_model_id: size,
//             size_chart: size
//         }
//         if(document.getElementsByName(model_id).checked){
//             //console.log(true)
//              models.push({
//                 uniform_model_id: model_id,
//                 size_chart: size_chart
//             })   
//             setApplicantUniformSCData([...applicantUniformSCData, {
//                 uniform_model_id: model_id,
//                 size_chart: size_chart
//             }])
//         }
//         // //console.log('DATA >', data)
//         // let item = models.some(value => { return (i) => value=={
//         //     uniform_model_id: model_id,
//         //     ...i
//         // }})

//         // if(event.checked){
         

//         // }
        
//         // if(models.includes({
//         //     uniform_model_id: model_id
//         // }, 0)){
//         //     next()
//         // }else{
//         //     //console.log(true)
//         //      models.push({
//         //         uniform_model_id: model_id,
//         //         size_chart: size_chart
//         //     })
//         // }
//         // models = []
//         // //console.log(models)
//         // applicantUniformSCData.push(data)

        

//         //console.log(applicantUniformSCData)
//         // setApplicantUniformSCData((e)=>({...e, {
//         //     uniform_model_id: model_id,
//         //     size_chart: size_chart
//         // }}))
//     }

//     const formatDate = (date) => {
//         const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
//         const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

//         date = new Date(date);
//         const dayName = dayNames[date.getDay()];
//         const day = date.getDate();
//         const monthName = monthNames[date.getMonth()];
//         const year = date.getFullYear();
//         const hour = date.getHours();
//         const minute = date.getMinutes();
//         const second = date.getSeconds();

//         const indonesianFormat = `${dayName}, ${day} ${monthName} ${year} ${hour}:${minute} WIB`;
//         return indonesianFormat
//     }

//     return (
//         <section ref={ref} className="relative">
//             <div className='max-w-6xl mx-auto px-4 sm:px-6 '>
//                 <div className='py-12 md:py-12'>
//                     <div className='max-w-sm md:max-w-4xl mx-auto'>
//                         <form action="" onSubmit={saveData}>
//                             <div className="space-y-12">
//                                 <div className="border-b border-gray-900/10 pb-12">
//                                 <h2 className="text-3xl font-semibold text-gray-900">Pengukuran Seragam</h2>
//                                 <p className="mt-1 text-sm/6 text-gray-600 italic">
//                                     Perhatikan ukuran sesuai dengan tabel ukuran seragam. 
//                                     {/* This information will be displayed publicly so be careful what you share. */}
//                                 </p>
//                                 <p className="mt-1 text-sm/12 text-gray-600">
//                                     Update terakhir: {last_update?formatDate(last_update):'-'}.
//                                 </p>

//                                 <div className="border-b border-gray-900/20 py-3"></div>

//                                 <div className="flex">
//                                     {/* {schoolUniformModel[0].model_url} */}
//                                     {/* <table> */}
//                                      {/* schoolUniformModel.forEach(
//                                         function(d){
//                                             fore += '<li>' + d.name + '</li>'
//                                             }
//                                         ) */}
//                                             <table dangerouslySetInnerHTML={{__html: tableData}}>
//                                                 {/* <ul ></ul> */}
                                        
//                                                 </table>
                                        
//                                     {/* </table> */}
//                                 </div>
//                                 <div className='flex justify-center text-center my-5'>
                                    
//                                     {!props.complete && (
//                                         <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800' disabled={props.isPending}
//                                                 // onClick={() => {
//                                                 //     // currentStep === steps.length
//                                                 //     //   ? setComplete(true)
//                                                 //     //   : setCurrentStep((prev) => prev + 1); 
//                                                 //     if(props.currentStep === 9){
//                                                 //     props.handledComplete(true)
//                                                 //     }else{
//                                                 //     // props.handledCurrentStep(props.currentStep + 1) ;
//                                                 //     // props.setCurrentStep((prev) => prev + 1);
//                                                 //     // callback(data)
//                                                 //     }
//                                                 //     // handleSubmit
    
                                                    
//                                                 // }}
//                                                 >
//                                                     {props.isPending? (
//                                                         <div>
//                                                             {/* // <button type="button" class="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white" disabled> */}
//                                                                 <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                                 <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                                                                 <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                                 Menyimpan...
//                                                                 </svg>
//                                                             {/* // </button> */}
//                                                             {/* // <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24"></svg> */}
                                                            
//                                                         </div>
//                                                     ) : 
//                                                     props.dataSeragam? 
//                                                         "Edit":
//                                                         "Simpan"
//                                                     }
                                                
//                                         </button>
//                                     )}
//                                 </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
           
//         </section>
//     )
// })

// export default PengukuranSeragam;