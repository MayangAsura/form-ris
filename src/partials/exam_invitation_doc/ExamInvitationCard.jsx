import React, { useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, Image} from '@react-pdf/renderer';
import Callighrafer from '/font/calln.ttf';

// Register fonts (you'll need to handle font loading appropriately)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});
Font.register({
  family: 'Callighrafer',
  fonts: [
    { src: Callighrafer, fontWeight: 300 },
    // { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    // { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    // { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    smarginBottom: 2,
    textAlign: 'center',
  },
  brandName: {
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Callighrafer',
  },
  section: {
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    gap: '2px',
    marginBottom: 10
  },
  profilePhotoContainer: {
    display: 'flex',
    direction: '',
    width: '20%',
    paddingRight: 0,
  },
  profilePhoto: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: '#000',
  },
  headerText: {
    display: 'flex',
    direction: 'column',
    // flex: '1',
    width: '80%',
  },
  sectionTitle: {
    display: 'flex',
    fontSize: 20,
    color: '#558fef',
    fontWeight: 'bold',
    marginBottom: 8,
    // backgroundColor: '#558fef',
    padding: 4,
  },
  sectionSubTitle: {
    display: 'flex',
    fontSize: 14,
    color: '#558fef',
    fontWeight: 'bold',
    marginBottom: 8,
    // backgroundColor: '#558fef',
    padding: 4,
  },
  table: {
    display: 'flex',
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    // borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  tableColHeader: {
    width: '40%',
    borderStyle: 'solid',
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: '5px',
    marginLeft: '5px',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // color: ''
    // textAlign: 'left'
  },
  tableCol: {
    width: '40%',
    borderStyle: 'solid',
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: '5px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  tableCol2Header: {
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: '5px',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // textAlign: 'left'
  },
  tableCol2: {
    width: '60%',
    borderStyle: 'solid',
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    paddingLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // textAlign: 'left'
  },
  tableCell: {
    margin: '3px 5px 0',
    // marginTop: 5,
    fontSize: 12,
    // justifyContent: 'flex-start',
    textAlign: 'left'
  },
  tableCell2: {
    margin: '2px 5px 0',
    // marginTop: 5,
    fontSize: 10,
    // justifyContent: 'flex-start',
    textAlign: 'left'
  },
  noteSection: {
    marginTop: 15,
    fontSize: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notes: {
    marginTop: 15,
    marginBottom: 3,
    fontSize: 10,
    color: '#FF0000'
  },
  noteItem: {
    marginLeft: 10,
    marginBottom: 3,
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: 'center',
    color: '#666',
  },
  color: {
    color: '#558fef'
  }
});

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
  
// Create Document Component
const ExamInvitationCard = ({ examData, profileData, dataApplicant }) => {

  useEffect(() => {
    if(examData){
      console.log('examData', examData)
    }
    if(dataApplicant){
      console.log('dataApplicant', dataApplicant)
    }
    if(profileData){
      console.log('profileData', profileData)
    }
  },[examData, dataApplicant, profileData])
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.profilePhotoContainer}>
              {profileData ? (
                <Image style={styles.profilePhoto} src={profileData.file_url} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>Foto</Text>
                  <Text style={styles.photoPlaceholderText}>3x4</Text>
                </View>
              )}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>PSB</Text>
            <Text style={styles.subtitle}>Penerimaan Santri Baru</Text>
            <Text style={[styles.subtitle, styles.brandName]}>Rabbaanii Islamic School</Text>
            <Text style={[styles.sectionTitle, styles.color]}>KARTU TANDA PESERTA PSB TA. 2026/2027</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>NOMOR PESERTA</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={[styles.tableCell, styles.textBold]} >: {dataApplicant.regist_number || '-'}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>NAMA PESERTA</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.full_name || '-'}</Text>
            </View>
          </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>NO. TELEPON</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.phone_number || '-'}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>TANGGAL LAHIR</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.participants[0].dob || '-'}</Text>
              </View>
            </View>
            
            {/* <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>NISN</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.nisn || '007745896'}</Text>
              </View>
            </View> */}
          </View>
        </View>

        {/* Dynamic Exam Data Section */}
        {examData && examData.length > 0 && examData.map((exam, index) => (
          <>
          <View key={index} style={styles.section}>
            <Text style={styles.sectionSubTitle}>JADWAL - {exam.exam_tests.title || `Seleksi ${index + 1}`}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell2}>SKEMA UJIAN</Text>
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell2}>: {exam.exam_tests.scheme || '-'}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell2}>LOKASI</Text>
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell2}>: {exam.exam_tests.location || '-'}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell2}>RUANGAN</Text>
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell2}>: {exam.exam_tests.room || '-'}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell2}>WAKTU MULAI</Text>
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell2}>: {formatDate(exam.exam_tests.started_at) || '-'}</Text>
                </View>
              </View>
            </View>
          </View>
          </>
        ))}
        <View style={styles.noteSection}>

            <Text style={[styles.notes, styles.noteItem, {marginTop: 5}]}>
              Catatan: Peserta harus hadir 1 jam sebelum ujian dimulai.
            </Text>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOKASI UTBK</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>PUSAT UTBK</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.pusatUtbk || 'UNIVERSITAS PENDIDIKAN INDONESIA - BANDUNG'}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>ALAMAT</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.alamat || 'Jl. Dr Setiabudhi 229 Bandung'}</Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>PILIHAN PROGRAM STUDI</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>PILIHAN 1</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.pilihan1 || 'UNIVERSITAS BRAWIJAYA 13721096 - SL - INDUSTRI PERIKANAN CEDINS'}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>PILIHAN 2</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.pilihan2 || 'UNIVERSITAS BRAWIJAYA 13721039 - SL - TEKNIK GEOFISIKA'}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>PILIHAN 3</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.pilihan3 || '-'}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>PILIHAN 4</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>: {dataApplicant.pilihan4 || '-'}</Text>
              </View>
            </View>
          </View>
        </View> */}

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>PERLENGKAPAN YANG HARUS DIBAWA PADA SAAT UJIAN:</Text>
          <Text style={styles.noteItem}>• Kartu Peserta Seleksi PSB 2026/2027</Text>
          {/* <Text style={styles.noteItem}>• Bagi Angkatan 2025: Surat Keterangan Kelas 12 asli yang ditandatangani oleh Kepala Sekolah serta berisi nama siswa, NISN, NPSN sekolah, dan pasfoto siswa terbaru (3 bulan terakhir)</Text>
          <Text style={styles.noteItem}>• Bagi lulusan 2023 dan 2024: Ijazah/Legalisir Ijazah</Text> */}
          <Text style={styles.noteItem}>• Identitas diri seperti KTP </Text>
          
          {/* <Text style={[styles.noteTitle, {marginTop: 10}]}>CATATAN PENTING:</Text> */}
          {/* <Text style={styles.noteItem}>• LOKASI UTBK HARUS DILIHAT SATU HARI SEBELUM PELAKSANAAN UJIAN.</Text> */}
          {/* <Text style={styles.noteItem}>• PESERTA HARUS DALAM KONDISI SEHAT.</Text> */}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.textCenter]}>Rabbaanii Islamic School - PSB Form - Info CS 085313642033</Text>
          <Text style={[styles.textCenter]}>Halaman ini diunduh pada {formatDate(new Date().toISOString())} </Text>
          {/* <Text>Dicetak pada: {new Date().toLocaleDateString('id-ID')}</Text> */}
        </View>
      </Page>
    </Document>

  )
};

export default ExamInvitationCard;

// import {
//   Page,
//   Text,
//   View,
//   Document,
//   PDFViewer,
//   PDFDownloadLink,
//   Image
// } from "@react-pdf/renderer";
// import { styles } from "./style";
// import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
// // import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
// import { useEffect, useState } from "react";


// export default function ExamInvitationCard(props){
//     const [identitas, setIdentitas] = useState({data:{}, full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", distance: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: "" })
//     const [sekolahAsal, setsekolahAsal] = useState({})
//     const [jenjangTujuan, setjenjangTujuan] = useState({})
//     const [dataAyah, setDataAyah] = useState({data:{}})
//     // {father_name: "", father_academic: "", father_job: "", father_salary: "", why_chooses: ""}
//     const [dataIbu, setDataIbu] = useState({})
//     // {mother_name: "", mother_academic: "", mother_job: "", mother_salary: ""}
//     const [dataWali, setDataWali] = useState({data:{}})
//     // wali_name: "", wali_academic: "", wali_job: "", wali_salary: ""
//     const [verifikasiKeluarga, setDataVerifikasiKeluarga] = useState({})
//     const [pilihan_metode_uangpangkal, setPilihanMetodeUangPangkal] = useState({})
//     const [nama, setName] = useState("")

//     const {dataExam, applicant} = props
//     // const [, setIdentitas] = useState({full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: "" })

//     useEffect(() => {
//       // setIdentitas(props.dataSummary.identitas)
//       // setsekolahAsal(props.dataSummary.sekolahAsal)
//       // setjenjangTujuan(props.dataSummary.jenjangTujuan)
//       // setDataAyah(props.dataSummary.dataAyah)
//       // if(Object.keys(props.dataSummary.identitas)>0){
//       //   identitas.data = props.dataSummary.identitas
//       //   // jenjangTujuan.class = props.dataSummary.dataAyah
//       // }
//       // if(Object.keys(props.dataSummary.jenjangTujuan)>0){
//       //   jenjangTujuan.school_name = props.dataSummary.school_name
//       //   jenjangTujuan.class = props.dataSummary.class
//       // }
//       // if(Object.keys(props.dataSummary.sekolahAsal)>0){
//       //   sekolahAsal.prev_school = props.dataSummary.prev_school
//       //   sekolahAsal.prev_school_address = props.dataSummary.prev_school_address
//       // }
//       // if(Object.keys(props.dataSummary.dataAyah)>0){
//       //   dataAyah.data = props.dataSummary.dataAyah
//       // }
//       // if(Object.keys(props.dataSummary.dataIbu)>0){
//       //   setDataIbu(props.dataSummary.dataIbu)
//       //   // dataIbu.data = props.dataSummary.dataIbu
//       // }
//       // if(Object.keys(props.dataSummary.dataWali)>0){
//       //   setDataWali(props.dataSummary.dataWali)
//       //   dataWali.data = props.dataSummary.dataWali
//       // }
//       // if(Object.keys(props.dataSummary.verifikasiKeluarga)>0){
//       //   verifikasiKeluarga.student_category = props.dataSummary.verifikasiKeluarga.student_category
//       // }
//       // if(Object.keys(props.dataSummary.pilihan_metode_uangpangkal)>0){
//       //   pilihan_metode_uangpangkal.metode_uang_pangkal = props.dataSummary.pilihan_metode_uangpangkal.metode_uang_pangkal
//       // }
//       // // setDataIbu(props.dataSummary.dataIbu)
//       // // setDataWali(props.dataSummary.dataWali)
//       // // setDataVerifikasiKeluarga(props.dataSummary.verifikasiKeluarga)
//       // setPilihanMetodeUangPangkal(props.dataSummary.pilihan_metode_uangpangkal)
//       // console.log('DSC> ',props.dataSummary)
//       // console.log('DAC> ',dataAyah)
//       console.log('DE> ',props.dataExam)
//       console.log('DE> ',props.profileData)
//     }, [props.applicant, props.dataExam, props.profileData])

//     const formatDate = (date) => {
//     const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
//     const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

//     date = new Date(date);
//     const dayName = dayNames[date.getDay()];
//     const day = date.getDate();
//     const monthName = monthNames[date.getMonth()];
//     const year = date.getFullYear();
//     const hour = date.getHours();
//     const minute = date.getMinutes();
//     const second = date.getSeconds();

//     const indonesianFormat = `${day} ${monthName} ${year} ${hour}:${minute} WIB`;
//     return indonesianFormat
//   }

//   const getCurrentDateTime = () => {
// // function getRealTime() {
//   const currentTime = Date.now();
//   console.log(new Date(Math.round(currentTime / 1000) * 1000), currentTime);
//   console.log((Math.floor(currentTime / 1000) + 1) * 1000 - currentTime)
//   return new Date(Math.round(currentTime / 1000) * 1000), currentTime;
// // }
//   }

//   const getSalaryText = (salary) => {
//     let text = ''
//     if(salary=='less_than_1jt') text = 'Kurang dari Rp1 Jt'
//     if(salary=='less_than_2jt') text = 'Kurang dari Rp2 Jt'
//     if(salary=='5jt_-_10j') text = 'Rp5 Jt - Rp10 Jt'
//     if(salary=='10jt_-_15jt') text = 'Rp10 Jt - Rp15 Jt'
//     if(salary=='15jt_-_20jt') text = 'Rp15 Jt - Rp20 Jt'
//     if(salary=='more_than_20jt') text = 'Lebih dari Rp20 Jt'
//     return text
      
//   }

//   const getPilihanMetodeUangPangkalText = (value) => {

//     if(value === 'gel_1') {
//       return 'Gelombang 1 (Dibayarkan 2 Pekan Setelah Dinyatakan diterima)'
//     }
//   }
//     // InvoicePDF = () => (
//       return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={[styles.header, styles.spaceX]}>
//           <View style={[styles.profile]}>
//             <Image src={props.profileData?.file_url} style={[styles.image, styles.profile]}></Image>
//           </View>
//           <View style={[styles.spaceY]}>
//             <View style={[styles.textCenter, styles.spaceX]}>
//               <View style={[styles.brand]}>
//                 <Image src="https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/public/foundations/images/1746411026819.png" style={styles.image}></Image>
//               </View>
//               <View style={[styles.textCenter]}>
//                 <Text style={[styles.headingTitle]}>PSB</Text>
//                 {/* <Text style={[styles.title, styles.textBold]}>ضصثقفغعهخحشسيبلاتنمئءؤرلاىةو  RABBAANII ISLAMIC SCHOOL</Text> */}
//                 {/* <Text style={[styles.title, styles.textBold]}>KARTU PESERTA SELEKSI</Text> */}
//                 <Text style={[styles.subheading, styles.textBold]}>PENERIMAAN SISWA BARU </Text>
//                 <Text style={[styles.subheading, styles.textBold, styles.brandName]}>RABBAANII ISLAMIC SCHOOL</Text>
//                 {/* <Text style={[styles.address]}>Jl. Cimandiri 8B RT 06/08 Graha Asri 17550, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17550.</Text> */}
                
//               </View>
//               {/* <Text style={[styles.borderT]}></Text> */}
//               {/* <Text style={[styles.borderT]}></Text> */}
//             </View>
//             <View style={[styles.textCenter, styles.title]}>
//               KARTU SELEKSI PSB <br/>
//               TA. 2026/2027
//             </View>

//           </View>
//           <View>
//           </View>
//           {/* <View style={styles.spaceY}>
//             // <Text style={styles.textBold}>Company Name</Text>
//             <Text>123 Business Street</Text>
//             <Text>City, State 12345</Text>
//           </View> */}
//         </View>
//         <View >
//           {/* <View style={styles.flex1}> */}
//             <View style={styles.spaceY}>
//               {/* <Text style={[styles.heading, styles.textBold]}>A. Identitas Calon Santri</Text> */}
//               <Table style={styles.table}>
//                             <TR >
//                                 <TD style={[styles.th, styles.name]}>No. Pendaftaran</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD > {props.applicant[0]?.regist_number??'-'}</TD>
//                                 {/* <TD >Total</TD> */}
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.th]}>Nama Peserta</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[]}> {props.applicant[0]?.full_name??'-'}</TD>
//                                 {/* <TD >Total</TD> */}
//                             </TR>
//                             {/* <TR >
//                                 <TD style={[styles.td]}>Jenis Kel</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[]}> {props.applicant[0]?.full_nameidentitas.gender??identitas.gender=='male'?'Laki-Laki': 'Perempuan'}</TD>
//                                 <TD >Total</TD>
//                             </TR> */}
//                             <TR >
//                                 <TD style={[styles.td]}>No. HP</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.applicant[0]?.phone_number??'-'}</TD>
//                                 {/* <TD >Total</TD> */}
//                             </TR>
//                             {/* <TR >
//                                 <TD style={[styles.td]}></TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.email??identitas.email}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>No. Pendaftaran</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.regist_number??identitas.regist_number}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Tempat, Tanggal Lahir</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {`${props.dataSummary.identitas.pob??identitas.pob}, ${formatDate(props.dataSummary.identitas.dob??identitas.dob)}`}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Anak ke-</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.child_number??identitas.child_number}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Alamat</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.address??identitas.address}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Negara</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.nationality??identitas.nationality}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Provinsi</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.province??identitas.province}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Kabupaten</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.region??identitas.region}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Kode Pos</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.postal_code??identitas.postal_code}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>Cita-Cita</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.aspiration??identitas.aspiration}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>NISN</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.nisn??identitas.nisn}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>No. NIK</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.nik??identitas.nik}</TD>
//                                 <TD >Total</TD>
//                             </TR>
//                             <TR >
//                                 <TD style={[styles.td]}>No. KK</TD>
//                                 <Text style={[styles.td]}>:</Text>
//                                 <TD style={[styles.td]}> {props.dataSummary.identitas.kk??identitas.kk}</TD>
//                                 <TD >Total</TD>
//                             </TR> */}
//                             </Table>

//               {/* <Text style={[styles.content]}>Nama              : </Text>
//               <Text>Jenis Kelamin     : </Text>
//               <Text>No. WhatsApp</Text>
//               <Text>Email</Text>
//               <Text>No. Pendaftaran</Text>
//               <Text></Text>
//               <Text>Tempat, Tanggal Lahir</Text>
//               <Text>NISN</Text>
//               <Text>Anak ke</Text>
//               <Text>Alamat</Text>
//               <Text>Kabupaten</Text>
//               <Text>Provinsi</Text>
//               <Text>Negara</Text>
//               <Text>Kode Pos</Text>
//               <Text>Cita-Cita</Text>
//               <Text>NIK</Text>
//               <Text>No. KK</Text> */}
//             </View>
//             {/* <Text >A. Identitas Calon Santri</Text> */}
//             {/* <Table style={styles.table}>
//                         <TR >
//                             <TD style={[styles.td]}>Description</TD>
//                             <TD style={[styles.td]}>Quantity</TD>
//                             <TD >Unit Price</TD>
//                             <TD >Total</TD>
//                         </TR>
//                         </Table> */}
//           </View>
//           {/* <View style={styles.flexNone}> */}
            
//               {/* <Text>Nama </Text>
//               <Text>Jenis Kelamin </Text>
//               <Text>No. WhatsApp</Text>
//               <Text>Email</Text>
//               <Text>No. Pendaftaran</Text> */}
            
//                         {/* <Text >B. Data Ayah</Text> */}
//           {/* </View> */}
//             {/* <Text><hr /></Text> */}
//             {/* <hr /> */}
//         {/* </View> */}

        
//         {dataExam[0]?.exam_tests.length>0 && dataExam[0]?.exam_tests.map((item, index) => (
//         // <View key={index} style={styles.section}>
//         //   <Text>Item Name: {item.name}</Text>
//         //   <Text>Item Value: {item.value}</Text>
//         // </View>
      
//         <View key={index} style={styles.spaceY}>
//           {/* <Text style={[styles.number, styles.textBold]}>A.</Text> */}
//           <Text style={[styles.heading2, styles.textBold]}>{item.name}</Text>
//           <Table style={styles.table}>
//             <TR>
//               <TD style={[styles.th]}>Tipe</TD>
//               <Text style={[styles.td]}>:</Text>
//               <TD style={[styles.td]}> {item.scheme} </TD>
//             </TR>
//             <TR>
//               <TD style={[styles.th]}>Lokasi</TD>
//               <Text style={[styles.td]}>:</Text>
//               <TD style={[styles.td]}> {item.location}</TD>
//             </TR>
//             <TR>
//               <TD style={[styles.th]}>Ruangan</TD>
//               <Text style={[styles.td]}>:</Text>
//               <TD style={[styles.td]}>{item.room} </TD>
//             </TR>
//             <TR>
//               <TD style={[styles.th]}>Hari, Tanggal</TD>
//               <Text style={[styles.td]}>:</Text>
//               <TD style={[styles.td]}>{formatDate(item.started_at)}</TD>
//             </TR>
//             {/* <TR>
//               <TD>Alasan Memilih Rabbaanii Islamic School</TD>
//               <TD>:</TD>
//               <TD>{dataIbu.why_chooses}</TD>
//             </TR> */}
//           </Table>
//           {/* <Text>Nama </Text>
//           <Text>Jenis Kelamin </Text>
//           <Text>No. WhatsApp</Text>
//           <Text>Email</Text>
//           <Text>No. Pendaftaran</Text> */}
//         </View>
//         ))}
//         <View style={[styles.footer]}>
//           <Text style={[styles.textCenter]}>PSB Form - Info CS 085313642033</Text>
//           <Text style={[styles.textCenter]}>Halaman ini diunduh pada {formatDate(new Date().toISOString())} </Text>
//         </View>

//         {/* <View> */}
//             {/* <ul>
//                 <li>A.</li>
//                 <li>Identitas Calon Santri</li>
//                 <li> */}
//                     {/* <Table style={styles.table}>
//                         <TR >
//                             <TD style={[styles.td]}>
//                               <View>

//                               </View>
//                             </TD>
//                             <TD style={[styles.td]}>Quantity</TD>
//                             <TD >Unit Price</TD>
//                             <TD >Total</TD>
//                         </TR>
//                     </Table> */}

//                 {/* </li>
//             </ul> */}
//         {/* </View> */}

//         {/* Render the table */}
//         {/* <Table style={styles.table}>
//           <TH style={[styles.tableHeader, styles.textBold]}>
//             <TD style={styles.td}>Description</TD>
//             <TD style={styles.td}>Quantity</TD>
//             <TD style={styles.td}>Unit Price</TD>
//             <TD style={styles.td}>Total</TD>
//           </TH>
//           {tabledataApplicant.map((item, index) => (
//             <TR key={index}>
//               <TD style={styles.td}>{item.description}</TD>
//               <TD style={styles.td}>{item.quantity}</TD>
//               <TD style={styles.td}>${item.unitPrice.toFixed(2)}</TD>
//               <TD style={styles.td}>${item.total.toFixed(2)}</TD>
//             </TR>
//           ))}
//         </Table> */}

//         {/* <View style={styles.totals}>
//           <View
//             style={{
//               minWidth: "256px",
//             }}
//           >
//             {totaldataApplicant.map((item) => (
//               <View
//                 style={{
//            View       flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <Text style={item.label === "Total" ? styles.textBold : {}}>
//                   {item.label}
//                 </Text>
//                 <Text style={item.label === "Total" ? styles.textBold : {}}>
//                   {item.value}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View> */}
//       </Page>
//     </Document>
//   );

//     return (
//         <div className="w-full h-[500px]">
//         <PDFViewer width="100%" height="100%">
//           <InvoicePDF />
//         </PDFViewer>
//       </div>
//     )
// }
   