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


export default function invoice(props){
    const [identitas, setIdentitas] = useState({full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", distance: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: "" })
    const [sekolahAsal, setSekolahAsal] = useState({prev_school: "", prev_school_address: ""})
    const [jenjangTujuan, setjenjangTujuan] = useState({school_name: "", class: ""})
    const [dataAyah, setDataAyah] = useState({father_name: "", father_academic: "", father_job: "", father_salary: "", why_chooses: ""})
    const [dataIbu, setDataIbu] = useState({mother_name: "", mother_academic: "", mother_job: "", mother_salary: ""})
    const [dataWali, setDataWali] = useState({wali_name: "", wali_academic: "", wali_job: "", wali_salary: ""})
    const [verifikasiKeluarga, setDataVerifikasiKeluarga] = useState({student_category: ""})
    const [pilihan_metode_uangpangkal, setPilihanMetodeUangPangkal] = useState({metode_uang_pangkal: ""})
    // const [, setIdentitas] = useState({full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: "" })

    useEffect(() => {
      setIdentitas(props.dataSummary.identitas)
      setSekolahAsal(props.dataSummary.sekolahAsal)
      setjenjangTujuan(props.dataSummary.jenjangTujuan)
      setDataAyah(props.dataSummary.dataAyah)
      setDataIbu(props.dataSummary.dataIbu)
      setDataWali(props.dataSummary.dataWali)
      setDataVerifikasiKeluarga(props.dataSummary.verifikasiKeluarga)
      setPilihanMetodeUangPangkal(props.dataSummary.pilihan_metode_uangpangkal)
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

    const indonesianFormat = `${day} ${monthName} ${year}`;
    return indonesianFormat
  }
   const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {/* <Text style={[styles.title, styles.textBold]}>ضصثقفغعهخحشسيبلاتنمئءؤرلاىةو  RABBAANII ISLAMIC SCHOOL</Text> */}
            <Text style={[styles.title, styles.textBold]}> RABBAANII ISLAMIC SCHOOL</Text>
            <Text style={[styles.address]}>Kampung Pamahan RT.001/006 Jatireja - Cikarang Timur – Kab. Bekasi
Website: www.rabbaanii.sch.id Telp. 0813-8891-8292</Text>
            {/* <Text style={[styles.borderT]}></Text> */}
          </View>
          <View>
          </View>
          {/* <View style={styles.spaceY}>
            <Text style={styles.textBold}>Company Name</Text>
            <Text>123 Business Street</Text>
            <Text>City, State 12345</Text>
          </View> */}
        </View>
        <View style={styles.flex}>
          <View style={styles.flex1}>
            <Text style={[styles.heading, styles.textBold]}>A. Identitas Calon Santri</Text>
            {/* <Table style={styles.table}>
                        <TR >
                            <TD style={[styles.td]}>Description</TD>
                            <TD style={[styles.td]}>Quantity</TD>
                            <TD >Unit Price</TD>
                            <TD >Total</TD>
                        </TR>
                        </Table> */}
          </View>
          <View style={styles.flex1}>
                        <Text style={[styles.heading, styles.textBold]}>B. Data Ayah</Text>
          </View>
            {/* <Text><hr /></Text> */}
            {/* <hr /> */}
        </View>

        <View style={styles.spaceY}>
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>A. Identitas Calon Santri</Text>
           <Table style={styles.table}>
                        <TR >
                            <TD style={[styles.td]}>Nama</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.full_name}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Jenis Kelamin</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.gender=='male'?'Laki-Laki': 'Perempuan'}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>No. WhatsApp</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.phone_number}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Email</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.email}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>No. Pendaftaran</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.regist_number}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Tempat, Tanggal Lahir</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{`${identitas.pob}, ${formatDate(identitas.bod)}`}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Anak ke</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.child_number}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Alamat</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.address}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Negara</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.nationality}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Provinsi</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.province}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Kabupaten</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.region}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Kode Pos</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.postal_code}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>Cita-Cita</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.aspiration}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>NISN</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.nisn?? "-"}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>No. NIK</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.nik?? "-"}</TD>
                            {/* <TD >Total</TD> */}
                        </TR>
                        <TR >
                            <TD style={[styles.td]}>No. KK</TD>
                            <TD style={[styles.td]}>:</TD>
                            <TD style={[styles.td]}>{identitas.kk}</TD>
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
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Data Sekolah Asal</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Nama Sekolah</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{sekolahAsal.prev_school}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Alamat</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{sekolahAsal.prev_school}</TD>
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
        <View style={styles.spaceY}>
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Jenjang Tujuan</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Jenjang</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{jenjangTujuan.school_name}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Kelas</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{jenjangTujuan.class}</TD>
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
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Data Ayah</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Nama</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataAyah.father_name}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pendidikan Terakhir</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataAyah.father_academic}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pekerjaan</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataAyah.father_job}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Penghasilan</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataAyah.father_salary}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Alasan Memilih Rabbaanii Islamic School</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataAyah.why_chooses}</TD>
            </TR>
          </Table>
          {/* <Text>Nama </Text>
          <Text>Jenis Kelamin </Text>
          <Text>No. WhatsApp</Text>
          <Text>Email</Text>
          <Text>No. Pendaftaran</Text> */}
        </View>
        <View style={styles.spaceY}>
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Data Ibu</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Nama</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataIbu.mother_name}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Pendidikan Terakhir</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataIbu.mother_academic}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Perkerjaan</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{dataIbu.mother_job}</TD>
            </TR>
            <TR>
              <TD style={[styles.td]}>Penghasilan</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}> {dataIbu.mother_salary}</TD>
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
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Data Wali</Text>
          <Table style={styles.table}>
            <TR>
              <TD>Nama</TD>
              <TD>:</TD>
              <TD>{dataWali.wali_name}</TD>
            </TR>
            <TR>
              <TD>Pendidikan Terakhir</TD>
              <TD>:</TD>
              <TD>{dataWali.wali_academic}</TD>
            </TR>
            <TR>
              <TD>Perkerjaan</TD>
              <TD>:</TD>
              <TD>{dataWali.wali_job}</TD>
            </TR>
            <TR>
              <TD>Penghasilan</TD>
              <TD>:</TD>
              <TD>{dataWali.wali_salary}</TD>
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
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Data Verifikasi Keluarga</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Kategori Siswa</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{verifikasiKeluarga.student_category}</TD>
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
          <Text style={[styles.number, styles.textBold]}>A.</Text>
          <Text style={[styles.heading, styles.textBold]}>B. Metode Pembayaran Uang Pangkal</Text>
          <Table style={styles.table}>
            <TR>
              <TD style={[styles.td]}>Pilihan Pembayaran</TD>
              <TD style={[styles.td]}>:</TD>
              <TD style={[styles.td]}>{pilihan_metode_uangpangkal.student_category}</TD>
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
   