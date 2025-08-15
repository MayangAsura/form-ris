import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { styles } from "./style";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
// import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { useEffect, useState } from "react";


export default function RegistrationCard(props){
    const [identitas, setIdentitas] = useState({data:{}, full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", distance: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: "" })
    const [sekolahAsal, setsekolahAsal] = useState({})
    const [jenjangTujuan, setjenjangTujuan] = useState({})
    const [dataAyah, setDataAyah] = useState({data:{}})
    // {father_name: "", father_academic: "", father_job: "", father_salary: "", why_chooses: ""}
    const [dataIbu, setDataIbu] = useState({})
    // {mother_name: "", mother_academic: "", mother_job: "", mother_salary: ""}
    const [dataWali, setDataWali] = useState({data:{}})
    // wali_name: "", wali_academic: "", wali_job: "", wali_salary: ""
    const [verifikasiKeluarga, setDataVerifikasiKeluarga] = useState({})
    const [pilihan_metode_uangpangkal, setPilihanMetodeUangPangkal] = useState({})
    const [nama, setName] = useState("")
    // const [, setIdentitas] = useState({full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: "" })

    useEffect(() => {
      // setIdentitas(props.dataSummary.identitas)
      // setsekolahAsal(props.dataSummary.sekolahAsal)
      // setjenjangTujuan(props.dataSummary.jenjangTujuan)
      // setDataAyah(props.dataSummary.dataAyah)
      if(Object.keys(props.dataSummary.identitas)>0){
        identitas.data = props.dataSummary.identitas
        // jenjangTujuan.class = props.dataSummary.dataAyah
      }
      if(Object.keys(props.dataSummary.jenjangTujuan)>0){
        jenjangTujuan.school_name = props.dataSummary.school_name
        jenjangTujuan.class = props.dataSummary.class
      }
      if(Object.keys(props.dataSummary.sekolahAsal)>0){
        sekolahAsal.prev_school = props.dataSummary.prev_school
        sekolahAsal.prev_school_address = props.dataSummary.prev_school_address
      }
      if(Object.keys(props.dataSummary.dataAyah)>0){
        dataAyah.data = props.dataSummary.dataAyah
      }
      if(Object.keys(props.dataSummary.dataIbu)>0){
        setDataIbu(props.dataSummary.dataIbu)
        // dataIbu.data = props.dataSummary.dataIbu
      }
      if(Object.keys(props.dataSummary.dataWali)>0){
        setDataWali(props.dataSummary.dataWali)
        dataWali.data = props.dataSummary.dataWali
      }
      if(Object.keys(props.dataSummary.verifikasiKeluarga)>0){
        verifikasiKeluarga.student_category = props.dataSummary.verifikasiKeluarga.student_category
      }
      if(Object.keys(props.dataSummary.pilihan_metode_uangpangkal)>0){
        pilihan_metode_uangpangkal.metode_uang_pangkal = props.dataSummary.pilihan_metode_uangpangkal.metode_uang_pangkal
      }
      // setDataIbu(props.dataSummary.dataIbu)
      // setDataWali(props.dataSummary.dataWali)
      // setDataVerifikasiKeluarga(props.dataSummary.verifikasiKeluarga)
      setPilihanMetodeUangPangkal(props.dataSummary.pilihan_metode_uangpangkal)
      // console.log('DSC> ',props.dataSummary)
      // console.log('DAC> ',dataAyah)
      // console.log('DIC> ',props.dataSummary.identitas)
    }, [props.dataSummary])

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

    const indonesianFormat = `${day} ${monthName} ${year} ${hour}:${minute} WIB`;
    return indonesianFormat
  }

  const getCurrentDateTime = () => {
// function getRealTime() {
  const currentTime = Date.now();
  console.log(new Date(Math.round(currentTime / 1000) * 1000), currentTime);
  console.log((Math.floor(currentTime / 1000) + 1) * 1000 - currentTime)
  return new Date(Math.round(currentTime / 1000) * 1000), currentTime;
// }
  }

  const getSalaryText = (salary) => {
    let text = ''
    if(salary=='less_than_1jt') text = 'Kurang dari Rp1 Jt'
    if(salary=='less_than_2jt') text = 'Kurang dari Rp2 Jt'
    if(salary=='5jt_-_10j') text = 'Rp5 Jt - Rp10 Jt'
    if(salary=='10jt_-_15jt') text = 'Rp10 Jt - Rp15 Jt'
    if(salary=='15jt_-_20jt') text = 'Rp15 Jt - Rp20 Jt'
    if(salary=='more_than_20jt') text = 'Lebih dari Rp20 Jt'
    return text
      
  }

  const getPilihanMetodeUangPangkalText = (value) => {

    if(value === 'gel_1') {
      return 'Gelombang 1 (Dibayarkan 2 Pekan Setelah Dinyatakan diterima)'
    }
    if(value === 'jalur_khusus') {
      return 'Jalur Khusus'
    }
  }
    // InvoicePDF = () => (
      return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.textCenter}>
            {/* <Text style={[styles.title, styles.textBold]}>ضصثقفغعهخحشسيبلاتنمئءؤرلاىةو  RABBAANII ISLAMIC SCHOOL</Text> */}
            <Text style={[styles.title, styles.textBold]}>RABBAANII ISLAMIC SCHOOL</Text>
            <Text style={[styles.address]}>Jl. Cimandiri 8B RT 06/08 Graha Asri 17550, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17550.</Text>
            {/* <Text style={[styles.borderT]}></Text> */}
            {/* <Text style={[styles.borderT]}></Text> */}
          </View>
          <View>
          </View>
          {/* <View style={styles.spaceY}>
            // <Text style={styles.textBold}>Company Name</Text>
            <Text>123 Business Street</Text>
            <Text>City, State 12345</Text>
          </View> */}
        </View>
        <View >
          {/* <View style={styles.flex1}> */}
            <View style={styles.spaceY}>
              <Text style={[styles.heading, styles.textBold]}>A. Identitas Calon Santri</Text>
              <Table style={styles.table}>
                            <TR >
                                <TD style={[styles.td]}>Nama</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD > {props.dataSummary.identitas.full_name?? nama}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Jenis Kelamin</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[]}> {props.dataSummary.identitas.gender??identitas.gender=='male'?'Laki-Laki': 'Perempuan'}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>No. WhatsApp</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.phone_number??identitas.data.phone_number}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Email</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.email??identitas.email}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>No. Pendaftaran</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.regist_number??identitas.regist_number}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Tempat, Tanggal Lahir</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {`${props.dataSummary.identitas.pob??identitas.pob}, ${formatDate(props.dataSummary.identitas.dob??identitas.dob)}`}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Anak ke-</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.child_number??identitas.child_number}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Alamat</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.address??identitas.address}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Negara</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.nationality??identitas.nationality}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Provinsi</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.province??identitas.province}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Kabupaten</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.region??identitas.region}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Kode Pos</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.postal_code??identitas.postal_code}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>Cita-Cita</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.aspiration??identitas.aspiration}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>NISN</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.nisn??identitas.nisn}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>No. NIK</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.nik??identitas.nik}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            <TR >
                                <TD style={[styles.td]}>No. KK</TD>
                                <Text style={[styles.td]}>:</Text>
                                <TD style={[styles.td]}> {props.dataSummary.identitas.kk??identitas.kk}</TD>
                                {/* <TD >Total</TD> */}
                            </TR>
                            </Table>

              {/* <Text style={[styles.content]}>Nama              : </Text>
              <Text>Jenis Kelamin     : </Text>
              <Text>No. WhatsApp</Text>
              <Text>Email</Text>
              <Text>No. Pendaftaran</Text>
              <Text></Text>
              <Text>Tempat, Tanggal Lahir</Text>
              <Text>NISN</Text>
              <Text>Anak ke</Text>
              <Text>Alamat</Text>
              <Text>Kabupaten</Text>
              <Text>Provinsi</Text>
              <Text>Negara</Text>
              <Text>Kode Pos</Text>
              <Text>Cita-Cita</Text>
              <Text>NIK</Text>
              <Text>No. KK</Text> */}
            </View>
            <View style={styles.spaceY}>
              <Text style={[styles.heading, styles.textBold]}>B. Data Sekolah Asal</Text>
              <Table style={styles.table}>
                <TR>
                  <TD style={[styles.td]}>Nama Sekolah</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {sekolahAsal.prev_school??props.dataSummary.sekolahAsal.prev_school}</TD>
                </TR>
                <TR>
                  <TD style={[styles.td]}>Alamat</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {sekolahAsal.prev_school_address??props.dataSummary.sekolahAsal.prev_school_address}</TD>
                </TR>
                {/* <TR>
                  <TD>Sekolah Asal</TD>
                  <TD>:</TD>
                  <TD>{sekolahAsal.prev_school}</TD>
                </TR> */}
              </Table>
              {/* <Text>Nama </Text>
              <Text>Jenis Kelamin </Text>
              <Text>No. WhatsApp</Text>
              <Text>Email</Text>
              <Text>No. Pendaftaran</Text> */}
              
              </View>
            {/* <Text >A. Identitas Calon Santri</Text> */}
            {/* <Table style={styles.table}>
                        <TR >
                            <TD style={[styles.td]}>Description</TD>
                            <TD style={[styles.td]}>Quantity</TD>
                            <TD >Unit Price</TD>
                            <TD >Total</TD>
                        </TR>
                        </Table> */}
          </View>
          {/* <View style={styles.flexNone}> */}
            <View style={styles.spaceY}>
          {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
              <Text style={[styles.heading, styles.textBold]}>C. Jenjang Tujuan</Text>
              <Table style={styles.table}>
                <TR>
                  <TD style={[styles.td]}>Jenjang</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {jenjangTujuan.school_name??props.dataSummary.jenjangTujuan.school_name}</TD>
                </TR>
                <TR>
                  <TD style={[styles.td]}>Kelas</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {jenjangTujuan.class??props.dataSummary.jenjangTujuan.class}</TD>
                </TR>
                {/* <TR>
                  <TD>Sekolah Asal</TD>
                  <TD>:</TD>
                  <TD>{sekolahAsal.prev_school}</TD>
                </TR> */}
              </Table>
              {/* <Text>Nama </T                                                                                                                                                                                                                                                                                                                               ext>
              <Text>Jenis Kelamin </Text>
              <Text>No. WhatsApp</Text>
              <Text>Email</Text>
              <Text>No. Pendaftaran</Text> */}
              
            </View>
            <View style={styles.spaceY}>
              {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
              <Text style={[styles.heading, styles.textBold]}>D. Data Ayah</Text>
              <Table style={styles.table}>
                <TR>
                  <TD style={[styles.td]}>Nama</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {dataAyah.father_name??props.dataSummary.dataAyah.father_name}</TD>
                </TR>
                <TR>
                  <TD style={[styles.td]}>Pendidikan Terakhir</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {dataAyah.father_academic??props.dataSummary.dataAyah.father_academic}</TD>
                </TR>
                <TR>
                  <TD style={[styles.td]}>Pekerjaan</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {dataAyah.father_job??props.dataSummary.dataAyah.father_job}</TD>
                </TR>
                <TR>
                  <TD style={[styles.td]}>Penghasilan</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {getSalaryText(dataAyah.father_salary??props.dataSummary.dataAyah.father_salary)}</TD>
                </TR>
                <TR>
                  <TD style={[styles.td]}>Alasan Memilih Rabbaanii Islamic School</TD>
                  <Text style={[styles.td]}>:</Text>
                  <TD style={[styles.td]}> {dataAyah.why_chooses??props.dataSummary.dataAyah.why_chooses}</TD>
                </TR>
              </Table>
              {/* <Text>Nama </Text>
              <Text>Jenis Kelamin </Text>
              <Text>No. WhatsApp</Text>
              <Text>Email</Text>
              <Text>No. Pendaftaran</Text> */}
            </View>
                        {/* <Text >B. Data Ayah</Text> */}
          {/* </View> */}
            {/* <Text><hr /></Text> */}
            {/* <hr /> */}
        {/* </View> */}

        
        
        <View style={styles.spaceY}>
          {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
          <Text style={[styles.heading, styles.textBold]}>E. Data Ibu</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Nama</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {dataIbu.mother_name??props.dataSummary.dataIbu.mother_name}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pendidikan Terakhir</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> { dataIbu.mother_academic??props.dataSummary.dataIbu.mother_academic}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pekerjaan</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {dataIbu.mother_job??props.dataSummary.dataIbu.mother_job}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Penghasilan</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {getSalaryText(dataIbu.mother_salary??props.dataSummary.dataIbu.mother_salary)}</TD>
            </TR>
            {/* <TR>
              <TD>Alasan Memilih Rabbaanii Islamic School</TD>
              <TD>:</TD>
              <TD>{dataIbu.why_chooses}</TD>
            </TR> */}
          </Table>
          {/* <Text>Nama </Text>
          <Text>Jenis Kelamin </Text>
          <Text>No. WhatsApp</Text>
          <Text>Email</Text>
          <Text>No. Pendaftaran</Text> */}
        </View>
        <View style={styles.spaceY}>
          {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
          <Text style={[styles.heading, styles.textBold]}>F. Data Wali</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Nama</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {dataWali.wali_name??props.dataSummary.dataWali.wali_name}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pendidikan Terakhir</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {dataWali.wali_academic??props.dataSummary.dataWali.wali_academic}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pekerjaan</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {dataWali.wali_job??props.dataSummary.dataWali.wali_job}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Penghasilan</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {getSalaryText(dataWali.wali_salary??props.dataSummary.dataWali.wali_salary)}</TD>
            </TR>
            {/* <TR>
              <TD>Alasan Memilih Rabbaanii Islamic School</TD>
              <TD>:</TD>
              <TD>{dataIbu.why_chooses}</TD>
            </TR> */}
          </Table>
          {/* <Text>Nama </Text>
          <Text>Jenis Kelamin </Text>
          <Text>No. WhatsApp</Text>
          <Text>Email</Text>
          <Text>No. Pendaftaran</Text> */}
        </View>
        <View style={styles.spaceY}>
          {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
          <Text style={[styles.heading, styles.textBold]}>G. Data Verifikasi Keluarga</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Kategori Siswa</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {(verifikasiKeluarga.student_category??props.dataSummary.verifikasiKeluarga.student_category)=='alumni'?"Alumni":((verifikasiKeluarga.student_category??props.dataSummary.verifikasiKeluarga.student_category)=='hasfamily'?"Memiliki saudara kandung sekolah di Rabbaanii":"Bukan Alumni/Keluarga Rabbaanii") }</TD>
            </TR>
            {/* <TR>
              <TD>Alasan Memilih Rabbaanii Islamic School</TD>
              <TD>:</TD>
              <TD>{dataIbu.why_chooses}</TD>
            </TR> */}
          </Table>
          {/* <Text>Nama </Text>
          <Text>Jenis Kelamin </Text>
          <Text>No. WhatsApp</Text>
          <Text>Email</Text>
          <Text>No. Pendaftaran</Text> */}
        </View>
        <View style={styles.spaceY}>
          {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
          <Text style={[styles.heading, styles.textBold]}>H. Metode Pembayaran Uang Pangkal</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Pilihan Pembayaran</TD>
              <Text style={[styles.td]}>:</Text>
              <TD style={[styles.td]}> {getPilihanMetodeUangPangkalText(pilihan_metode_uangpangkal.metode_uang_pangkal??props.dataSummary.pilihan_metode_uangpangkal.metode_uang_pangkal)}</TD>
            </TR>
            {/* <TR>
              <TD>Alasan Memilih Rabbaanii Islamic School</TD>
              <TD>:</TD>
              <TD>{dataIbu.why_chooses}</TD>
            </TR> */}
          </Table>
          {/* <Text>Nama </Text>
          <Text>Jenis Kelamin </Text>
          <Text>No. WhatsApp</Text>
          <Text>Email</Text>
          <Text>No. Pendaftaran</Text> */}
        </View>
        <View style={[styles.footer]}>
          <Text style={[styles.textCenter]}>PSB Form - Info CS 08123456789</Text>
          <Text style={[styles.textCenter]}>Halaman ini diunduh pada {formatDate(new Date().toISOString())} </Text>
        </View>

        {/* <View> */}
            {/* <ul>
                <li>A.</li>
                <li>Identitas Calon Santri</li>
                <li> */}
                    {/* <Table style={styles.table}>
                        <TR >
                            <TD style={[styles.td]}>
                              <View>

                              </View>
                            </TD>
                            <TD style={[styles.td]}>Quantity</TD>
                            <TD >Unit Price</TD>
                            <TD >Total</TD>
                        </TR>
                    </Table> */}

                {/* </li>
            </ul> */}
        {/* </View> */}

        {/* Render the table */}
        {/* <Table style={styles.table}>
          <TH style={[styles.tableHeader, styles.textBold]}>
            <TD style={styles.td}>Description</TD>
            <TD style={styles.td}>Quantity</TD>
            <TD style={styles.td}>Unit Price</TD>
            <TD style={styles.td}>Total</TD>
          </TH>
          {tableData.map((item, index) => (
            <TR key={index}>
              <TD style={styles.td}>{item.description}</TD>
              <TD style={styles.td}>{item.quantity}</TD>
              <TD style={styles.td}>${item.unitPrice.toFixed(2)}</TD>
              <TD style={styles.td}>${item.total.toFixed(2)}</TD>
            </TR>
          ))}
        </Table> */}

        {/* <View style={styles.totals}>
          <View
            style={{
              minWidth: "256px",
            }}
          >
            {totalData.map((item) => (
              <View
                style={{
           View       flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <Text style={item.label === "Total" ? styles.textBold : {}}>
                  {item.label}
                </Text>
                <Text style={item.label === "Total" ? styles.textBold : {}}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View> */}
      </Page>
    </Document>
  );

    return (
        <div className="w-full h-[500px]">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF />
        </PDFViewer>
      </div>
    )
}
   