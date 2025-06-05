import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { isPending } from '@reduxjs/toolkit'
import e from 'cors'
import { useEffect, useState } from 'react'
import { json } from 'react-router-dom'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'

const PengukuranSeragam = (props) => {
    const [schoolUniformModel, setSchoolUniformModel] = useState([])
// {model_gender:"", model_name:"", model_size_chart:"", model_url: "", school_id: ""}
// {uniform_model_id:"", size_chart:""}
    const [applicantUniformSC, setApplicantUniformSC] = useState([])
    const [applicantUniformSCData, setApplicantUniformSCData] = useState([])
    const [participant_id, setParticipantId] = useState([])
    const [tableData, setTableData] = useState([])
    const [formData, setFormData] = useState({})
    
    const [last_update, setLastUpdate] = useState("")
    // const [father_academic, setFatherAcademic] = useState("")
    // const [father_job, setFatherJob] = useState("")
    // const [father_salary, setFatherSalary] = useState("")
    // const [why_chooses, setWhyChooses] = useState("")
    // const [last_update, setLastUpdate] = useState("")

    // const data = { father_name:father_name, father_academic:father_academic, father_job:father_job, father_salary:father_salary, why_chooses:why_chooses}

    useEffect(() => {
        // console.log('props.dataAyah>', props.dataAyah)
        // setFatherName(props.dataAyah?.father_name)
        // setFatherAcademic(props.dataAyah?.father_academic)
        // setFatherSalary(props.dataAyah?.father_salary)
        // setFatherJob(props.dataAyah?.father_job)
        // setWhyChooses(props.dataAyah?.why_chooses)
        // setLastUpdate(props.dataAyah?.updated_at)
        if(props.dataSeragam.length > 0){
            setApplicantUniformSC(props.dataSeragam)
            setLastUpdate(props.dataSeragam[0].updated_at)
        }
        if(props.schoolUniformModel.length > 0){
            setSchoolUniformModel(props.schoolUniformModel)
            generateUniformModelForm()
            console.log('setSchoolUniformModel', setSchoolUniformModel)
            
        }

        props.participant? setParticipantId(props.participant): ""
    },[props.dataSeragam, props.schoolUniformModel, props.gender, props.participant])
    const models = []
    const saveData = (e) => {
        e.preventDefault()
        // console.log('e >', e)
        for (let i = 0; i < 23; i++) {
            const x = e.target[i];

            if(x.checked){models.push({
                uniform_model_id: x.name,
                participant_id: participant_id,
                size_chart: x.value
            })}     
        }
        console.log(models)
        console.log('formData>', formData)
        console.log('applicantUniformSCData>', applicantUniformSCData)
        props.onSubmit(models)
        
        generateUniformModelForm()
        
    }

    const generateUniformModelForm = () => {
        var data = ''
        var subdata = ''
        var size = ''
        for (let index = 0; index < schoolUniformModel.length; index++) {
            const m = schoolUniformModel[index];
            // data += '<form action="" onSubmit={saveData}>'
            // console.log(props.gender)
            if(props.gender == m.model_gender && props.school == m.school_id){

                data  += `<tr>
                <td><img src=${m.model_url} alt=""  /></td>
                
                </tr>
                <tr>
                                                        <th>${m.model_name}<span className="text-red-600">*</span></th>
                                                        <th class="px-3">PB</th>
                                                        <th class="px-3">LD</th>
                                                        <th class="px-3">LP</th>
                                                        <th class="px-3">PT</th>
                                                    </tr>
                                                    `

                //    console.log(m.id, JSON.parse(m.model_size_charts))
                
                const model_size_charts = JSON.parse(m.model_size_charts)
                for (let key in model_size_charts) {
                    const checked = props.dataSeragam[index].uniform_model_id== m.id && props.dataSeragam[index].size_chart==key?'checked':''
                    console.log(props.dataSeragam[index].uniform_model_id, props.dataSeragam[index].size_chart)
                    console.log(checked)
                // console.log(key, model_size_charts[key]);
                // const s = Object.keys(model_size_charts)[i];
                        subdata += `
                        <tr className='flex flex-row justify-start items-center'>
                        <th class='text-start'><input type="radio" name="`+m.id+`" value="${key}" onchange="`+setValue(m.id, key)+`" ${checked}  class='form-input text-gray-800 text-start' /><label htmlFor="XXXS" className='block text-medium text-gray-900'> ${key}</label></th>`
                        for (let index = 0; index < model_size_charts[key].length; index++) {
                        const s = model_size_charts[key][index];
                        
                        size += `<td class="px-3">${s}</td>`
                    } 
                    subdata += size
                    size=""
                    //    model_size_charts[key].forEach(s => {
                        //     });
                        subdata +=`</tr>`
                    }
                    
                    
                    data += subdata
                    subdata=""  
            }
            // else
            // {
            //     data += "Belum ada data ukuran seragam"
            // }
        }
        
        setTableData(data)
    }


    const setValue = (model_id, size) => {
        // console.log(e)
        // const { name, value } = e;
        // console.log(e.target)
        // setFormData((prevState) => ({ ...prevState, [name]: value }));
        const data = {
            uniform_model_id: size,
            size_chart: size
        }
        if(document.getElementsByName(model_id).checked){
            console.log(true)
             models.push({
                uniform_model_id: model_id,
                size_chart: size_chart
            })   
            setApplicantUniformSCData([...applicantUniformSCData, {
                uniform_model_id: model_id,
                size_chart: size_chart
            }])
        }
        // console.log('DATA >', data)
        // let item = models.some(value => { return (i) => value=={
        //     uniform_model_id: model_id,
        //     ...i
        // }})

        // if(event.checked){
         

        // }
        
        // if(models.includes({
        //     uniform_model_id: model_id
        // }, 0)){
        //     next()
        // }else{
        //     console.log(true)
        //      models.push({
        //         uniform_model_id: model_id,
        //         size_chart: size_chart
        //     })
        // }
        // models = []
        // console.log(models)
        // applicantUniformSCData.push(data)

        

        console.log(applicantUniformSCData)
        // setApplicantUniformSCData((e)=>({...e, {
        //     uniform_model_id: model_id,
        //     size_chart: size_chart
        // }}))
    }

    const formatDate = (date) => {
        const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        date = new Date(date);
        const dayName = dayNames[date.getDay()];
        const day = date.getDate();
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        const indonesianFormat = `${dayName}, ${day} ${monthName} ${year} ${hour}:${minute} WIB`;
        return indonesianFormat
    }

    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6 '>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="" onSubmit={saveData}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Pengukuran Seragam</h2>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Perhatikan ukuran sesuai dengan tabel ukuran seragam. 
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <p className="mt-1 text-sm/12 text-gray-600">
                                    Update terakhir: {last_update?formatDate(last_update):'-'}.
                                </p>

                                <div className="border-b border-gray-900/20 py-3"></div>

                                <div className="flex">
                                    {/* {schoolUniformModel[0].model_url} */}
                                    {/* <table> */}
                                     {/* schoolUniformModel.forEach(
                                        function(d){
                                            fore += '<li>' + d.name + '</li>'
                                            }
                                        ) */}
                                            <table dangerouslySetInnerHTML={{__html: tableData}}>
                                                {/* <ul ></ul> */}
                                        
                                                </table>
                                        
                                    {/* </table> */}
                                </div>
                                <div className='flex justify-center text-center my-5'>
                                    
                                    {!props.complete && (
                                        <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800' disabled={props.isPending}
                                                // onClick={() => {
                                                //     // currentStep === steps.length
                                                //     //   ? setComplete(true)
                                                //     //   : setCurrentStep((prev) => prev + 1); 
                                                //     if(props.currentStep === 9){
                                                //     props.handledComplete(true)
                                                //     }else{
                                                //     // props.handledCurrentStep(props.currentStep + 1) ;
                                                //     // props.setCurrentStep((prev) => prev + 1);
                                                //     // callback(data)
                                                //     }
                                                //     // handleSubmit
    
                                                    
                                                // }}
                                                >
                                                    {props.isPending? (
                                                        <div>
                                                            {/* // <button type="button" class="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white" disabled> */}
                                                                <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                Menyimpan...
                                                                </svg>
                                                            {/* // </button> */}
                                                            {/* // <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24"></svg> */}
                                                            
                                                        </div>
                                                    ) : 
                                                        "Simpan"
                                                    }
                                                
                                        </button>
                                    )}
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
        </section>
    )
}

export default PengukuranSeragam;