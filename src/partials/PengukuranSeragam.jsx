import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { isPending } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'

const PengukuranSeragam = (props) => {
    const [dataSeragam, setDataSeragam] = useState({model_gender:"", model_name:"", model_size_chart:"", model_url: "", school_id: ""})
    // const [father_academic, setFatherAcademic] = useState("")
    // const [father_job, setFatherJob] = useState("")
    // const [father_salary, setFatherSalary] = useState("")
    // const [why_chooses, setWhyChooses] = useState("")
    // const [last_update, setLastUpdate] = useState("")

    const data = { father_name:father_name, father_academic:father_academic, father_job:father_job, father_salary:father_salary, why_chooses:why_chooses}

    useEffect(() => {
        console.log('props.dataAyah>', props.dataAyah)
        setFatherName(props.dataAyah?.father_name)
        setFatherAcademic(props.dataAyah?.father_academic)
        setFatherSalary(props.dataAyah?.father_salary)
        setFatherJob(props.dataAyah?.father_job)
        setWhyChooses(props.dataAyah?.why_chooses)
        setLastUpdate(props.dataAyah?.updated_at)
    },[props.dataAyah])
    const saveData = (e) => {
        e.preventDefault()
        console.log(data)
        props.onSubmit(data)
        
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
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="" onSubmit={saveData}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Data Ayah</h2>
                                <p className="mt-1 text-sm/12 text-gray-600">
                                    Update terakhir: {last_update?formatDate(last_update):'-'}.
                                </p>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Data Diri Ayah Kandung
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>

                                <div className="border-b border-gray-900/20 py-3"></div>

                                <div className="flex">
                                    <table>
                                        <tr>
                                            <th>Seragam Batik dan Koko</th>
                                            <th>PB</th>
                                            <th>LD</th>
                                            <th>LP</th>
                                            <th>PT</th>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXXS" className='block text-medium text-gray-900'>XXXS</label><input type="radio" name="batikkoko_xxxs" value={"XXXS"} className='form-input text-gray-800' /></th>
                                            <td>65</td>
                                            <td>45</td>
                                            <td>21</td>
                                            <td>52</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXS" className='block text-medium text-gray-900'>XXS</label><input type="radio" name="batikkoko_xxs" value={"XXS"} className='form-input text-gray-800' /></th>
                                            <td>68</td>
                                            <td>48</td>
                                            <td>22</td>
                                            <td>22</td>
                                            <td>53</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XS" className='block text-medium text-gray-900'>XS</label><input type="radio" name="batikkoko_xs" value={"XS"} className='form-input text-gray-800' /></th>
                                            <td>70</td>
                                            <td>50</td>
                                            <td>23</td>
                                            <td>54</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="S" className='block text-medium text-gray-900'>S</label><input type="radio" name="batikkoko_s" value={"S"} className='form-input text-gray-800' /></th>
                                            <td>74</td>
                                            <td>52</td>
                                            <td>24</td>
                                            <td>55</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="M" className='block text-medium text-gray-900'>M</label><input type="radio" name="batikkoko_xs" value={"M"} className='form-input text-gray-800' /></th>
                                            <td>75</td>
                                            <td>55</td>
                                            <td>25</td>
                                            <td>56</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="L" className='block text-medium text-gray-900'>L</label><input type="radio" name="batikkoko_l" value={"L"} className='form-input text-gray-800' /></th>
                                            <td>76</td>
                                            <td>59,5</td>
                                            <td>26</td>
                                            <td>56</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XL" className='block text-medium text-gray-900'>XL</label><input type="radio" name="batikkoko_xl" value={"XL"} className='form-input text-gray-800' /></th>
                                            <td>77</td>
                                            <td>64</td>
                                            <td>27</td>
                                            <td>56</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXL" className='block text-medium text-gray-900'>XXL</label><input type="radio" name="batikkoko_xxl" value={"XXL"} className='form-input text-gray-800' /></th>
                                            <td>78</td>
                                            <td>66</td>
                                            <td>28</td>
                                            <td>56</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXXL" className='block text-medium text-gray-900'>XXXL</label><input type="radio" name="batikkoko_xxxl" value={"XXXL"} className='form-input text-gray-800' /></th>
                                            <td>80</td>
                                            <td>68</td>
                                            <td>29</td>
                                            <td>57</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="flex">
                                    <table>
                                        <tr>
                                            <th>Kaos Olahraga</th>
                                            <th>PB</th>
                                            <th>LD</th>
                                            <th>PT</th>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XS" className='block text-medium text-gray-900'>XS</label><input type="radio" name="batikkoko_xs" value={"XS"} className='form-input text-gray-800' /></th>
                                            <td>64</td>
                                            <td>44</td>
                                            <td>45</td>
                                            {/* <td>54</td> */}
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="S" className='block text-medium text-gray-900'>S</label><input type="radio" name="batikkoko_s" value={"S"} className='form-input text-gray-800' /></th>
                                            <td>66</td>
                                            <td>46</td>
                                            <td>45</td>
                                            {/* <td>55</td> */}
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="M" className='block text-medium text-gray-900'>M</label><input type="radio" name="batikkoko_xs" value={"M"} className='form-input text-gray-800' /></th>
                                            <td>69</td>
                                            <td>48</td>
                                            <td>46</td>
                                            {/* <td>56</td> */}
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="L" className='block text-medium text-gray-900'>L</label><input type="radio" name="batikkoko_l" value={"L"} className='form-input text-gray-800' /></th>
                                            <td>72</td>
                                            <td>50</td>
                                            <td>48</td>
                                            {/* <td>56</td> */}
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XL" className='block text-medium text-gray-900'>XL</label><input type="radio" name="batikkoko_xl" value={"XL"} className='form-input text-gray-800' /></th>
                                            <td>75</td>
                                            <td>52</td>
                                            <td>50</td>
                                            {/* <td>56</td> */}
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXL" className='block text-medium text-gray-900'>XXL</label><input type="radio" name="batikkoko_xxl" value={"XXL"} className='form-input text-gray-800' /></th>
                                            <td>78</td>
                                            <td>54</td>
                                            <td>52</td>
                                            {/* <td>56</td> */}
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXXL" className='block text-medium text-gray-900'>XXXL</label><input type="radio" name="batikkoko_xxxl" value={"XXXL"} className='form-input text-gray-800' /></th>
                                            <td>80</td>
                                            <td>57</td>
                                            <td>52</td>
                                            {/* <td>57</td> */}
                                        </tr>
                                    </table>
                                </div>
                                <div className="flex">
                                    <table>
                                        <tr>
                                            <th>Celana Olahraga</th>
                                            <th>LP</th>
                                            <th>KC</th>
                                            <th>LB</th>
                                            <th>PC</th>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XS" className='block text-medium text-gray-900'>XS</label><input type="radio" name="batikkoko_xs" value={"XS"} className='form-input text-gray-800' /></th>
                                            <td>74</td>
                                            <td>54</td>
                                            <td>24</td>
                                            <td>77</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="S" className='block text-medium text-gray-900'>S</label><input type="radio" name="batikkoko_s" value={"S"} className='form-input text-gray-800' /></th>
                                            <td>76</td>
                                            <td>56</td>
                                            <td>26</td>
                                            <td>80</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="M" className='block text-medium text-gray-900'>M</label><input type="radio" name="batikkoko_xs" value={"M"} className='form-input text-gray-800' /></th>
                                            <td>78</td>
                                            <td>58</td>
                                            <td>28</td>
                                            <td>83</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="L" className='block text-medium text-gray-900'>L</label><input type="radio" name="batikkoko_l" value={"L"} className='form-input text-gray-800' /></th>
                                            <td>80</td>
                                            <td>60</td>
                                            <td>30</td>
                                            <td>86</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XL" className='block text-medium text-gray-900'>XL</label><input type="radio" name="batikkoko_xl" value={"XL"} className='form-input text-gray-800' /></th>
                                            <td>82</td>
                                            <td>62</td>
                                            <td>32</td>
                                            <td>89</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXL" className='block text-medium text-gray-900'>XXL</label><input type="radio" name="batikkoko_xxl" value={"XXL"} className='form-input text-gray-800' /></th>
                                            <td>84</td>
                                            <td>64</td>
                                            <td>24</td>
                                            <td>92</td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="XXXL" className='block text-medium text-gray-900'>XXXL</label><input type="radio" name="batikkoko_xxxl" value={"XXXL"} className='form-input text-gray-800' /></th>
                                            <td>86</td>
                                            <td>66</td>
                                            <td>36</td>
                                            <td>95</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className='flex justify-center text-center my-5'>
                                    
                                    {!props.complete && (
                                        <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800'
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
                                                >Submit</button>
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