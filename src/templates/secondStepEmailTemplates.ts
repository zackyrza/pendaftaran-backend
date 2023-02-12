// This file is used to generate the html template for the second step email
import fs from 'fs';
import path from 'path';
import { ISecondStepEmailData } from "../interfaces/SecondStepEmail";

const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

type candidateKey =
    "name"
    | "registrationId"
    | "status"
    | "nik"
    | "gender"
    | "placeOfBirth"
    | "birthDate"
    | "age"
    | "education"
    | "bloodType"
    | "rhesusType"
    | "weight"
    | "height"
    | "handphone"
    | "religion"
    | "occupation"
    | "maritalStatus"
    | "photo"
    | "email"
    | "ktp"
    | "ijazah"
    | "shoesNumber"
    | "shirtSize";

const registrationSecondStepEmail = function (dataString: string) {
  const data: ISecondStepEmailData = JSON.parse(dataString);
    const photo = path.join(process.cwd(), data.candidate.photo);
  const photoUrl = data.candidate.photo === "" ? "" : "data:image/png;base64," + fs.readFileSync(photo, { encoding: "base64" });
  
  const html = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
        /* Add custom classes and styles that you want inlined here */
        </style>
      </head>
      <body class="bg-light">
        <div class="container">
          <div class="card my-10">
            <div class="card-body">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                <p style="font-size: 14px; font-weight: 600; text-align: center; margin: 0; margin-bottom: 10px;">PORPROV XII TAHUN 2023 KALIMANTAN TENGAH - BARITO UTARA</p>
                <p style="font-size: 14px; font-weight: 600; text-align: center; margin: 0; margin-bottom: 10px;">FORM TAHAP II</p>
                <p style="font-size: 14px; text-align: center; margin: 0; margin-bottom: 10px;">Dilaksanakan pada tanggal 9 - 10 Februari 2023 di Palangkaraya</p>
              </div>
              <hr>
              <div class="space-y-3">
                <style type="text/css">
                  .tg  {width:100%;border-collapse:collapse;border-spacing:0;border:solid 1px #000000;}
                  .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                  overflow:hidden;padding:6px 3px;word-break:normal;border:solid 1px #000000;}
                  .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;border:solid 1px #000000;}
                  .tg .tg-nrix{vertical-align:middle;border:solid 1px #000000; font-size: 12px;}
                </style>
                <table class="tg">
                  <colgroup>
                    <col style="width: 250px">
                    <col style="width: 450px">
                  </colgroup>
                  <thead>
                    <tr>
                      <th colspan="2" class="tg-nrix">
                        DETAIL FORM
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-nrix">KONTINGEN KAB/KOTA</td>
                      <td class="tg-nrix">${data.city.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td class="tg-nrix">CABANG OLAHRAGA</td>
                      <td class="tg-nrix">${data.sport.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td class="tg-nrix">NOMOR/EVENT/KELAS</td>
                      <td class="tg-nrix">${data.className.toUpperCase()}</td>
                    </tr>
                    ${Object.keys(data.candidate).map((key) => {
                        let value: string | number | Date = data.candidate[key as candidateKey];
                        let keyName = key.toUpperCase();
                        if (key === "birthDate") {
                            value = new Date(value).getDate() + " " + month[new Date(value).getMonth()] + " " + new Date(value).getFullYear();
                        }
                        if (typeof value === 'string') {
                            value = value.toUpperCase();
                        }
                        if (
                            value === null || key === "email" ||
                            key === "photo" || key === "deletedAt" ||
                            key === "createdAt" || key === "updatedAt" ||
                            key === "id" || key === "registrationId" ||
                            key === "ktp" || key === "ijazah"
                        ) {
                            return;
                        }
                        switch (key) {
                            case "name":
                                keyName = "NAMA";
                                break;
                            case "status":
                                keyName = "STATUS PADA KONTINGEN";
                                break;
                            case "nik":
                                keyName = "NIK KTP/KK";
                                break;
                            case "gender":
                                keyName = "JENIS KELAMIN";
                                break;
                            case "placeOfBirth":
                                keyName = "TEMPAT LAHIR";
                                break;
                            case "birthDate":
                                keyName = "TANGGAL LAHIR";
                                break;
                            case "age":
                                keyName = "USIA";
                                break;
                            case "education":
                                keyName = "PENDIDIKAN TERAKHIR";
                                break;
                            case "bloodType":
                                keyName = "GOLONGAN DARAH";
                                break;
                            case "rhesusType":
                                keyName = "RHESUS";
                                break;
                            case "weight":
                                keyName = "BERAT BADAN";
                                break;
                            case "height":
                                keyName = "TINGGI BADAN";
                                break;
                            case "religion":
                                keyName = "AGAMA";
                                break;
                            case "handphone":
                                keyName = "NO. HANDPHONE";
                                break;
                            case 'occupation':
                                keyName = "PEKERJAAN";
                                break;
                            case 'maritalStatus':
                                keyName = "STATUS PERKAWINAN";
                                break;
                            case 'shoesNumber':
                                keyName = "NOMOR SEPATU";
                                break;
                            case 'shirtSize':
                                keyName = "SIZE BAJU";
                                break;
                            default:
                                break;
                        }
                        return `
                            <tr>
                                <td class="tg-nrix">${keyName}</td>
                                <td class="tg-nrix">${value}</td>
                            </tr>
                        `
                    }).join("")}
                    <tr>
                        <td colspan="2">
                            <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                                <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 0.65;">
                                    <div>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 2.5px;">
                                            Syarat Keabsahan Data (dokumen yang wajib dilampirkan) :
                                        </p>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 2.5px;">
                                            1. Fotocopy KTP (Kartu Tanda Penduduk);
                                        </p>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 2.5px;">
                                            2. Fotocopy KK (Kartu Keluarga);
                                        </p>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 2.5px;">
                                            3. Fotocopy Akta Kelahiran;
                                        </p>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 2.5px;">
                                            4. Fotocopy Ijazah Terakhir bagi yang berusia dibawah 17 tahun;
                                        </p>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 5px;">
                                            5. Pas Foto 3 x 4 sebanyak 3 lembar.
                                        </p>
                                    </div>
                                    <div>
                                        <p style="font-size: 10px; margin: 0; margin-bottom: 5px;">
                                            Form Tahap II kepada Panitia selambat-lambatnya pada tanggal 10 Februari 2023 di Sekretariat KONI Provinsi Kalimantan Tengah Palangkaraya.
                                        </p>
                                        <p style="font-size: 10px; margin: 0;">
                                            Pada Tahap III (Keabsahan Data) wajib membawa persyaratan atlet berupa KTP asli, KK asli, Akta Kelahiran asli / Ijazah Terakhir bagi yang berusia dibawah 17 tahun.
                                        </p>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-end; flex: 0.35;">
                                    ${data.candidate.photo !== null ? `
                                        <img src="${photoUrl}" style="width: 70%; object-fit: contain;" />
                                    ` : ''}
                                </div>
                            </div>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div style="display: flex; flex-direction: row; justify-content: flex-end; width: 100%;">
                                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.45;">
                                    <p style="text-align: center; font-size: 14px; margin: 0;">
                                        ${new Date().getDate()} ${month[new Date().getMonth()]} ${new Date().getFullYear()}
                                    </p>
                                    <p style="text-align: center; font-size: 13px; border-bottom: 1px solid #000; margin: 0; margin-top: 45px;">
                                        ${data.candidate.name}
                                    </p>
                                    <p style="text-align: center; font-size: 13px; margin: 0;">
                                        Atlet
                                    </p>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; margin-top: 65px;">
                                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.45;">
                                    <p style="text-align: center; font-size: 16px; font-weight: 600; margin: 0;"></p>
                                    <p style="text-align: center; font-size: 12px; border-top: 1px solid #000; margin: 0;">Ketua / Sekretaris KONI Kabupaten / Kota</p>
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.45;">
                                    <p style="text-align: center; font-size: 16px; font-weight: 600; margin: 0;"></p>
                                    <p style="text-align: center; font-size: 12px; border-top: 1px solid #000; margin: 0;">Ketua / Sekretaris Pengkab / Pengkot</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
                <div style="display: flex; flex-direction: column; margin-top: 5px;">
                    <p style="font-size: 9px; margin: 0; margin-bottom: 5px;">*Wajib TTD dan Cap Stampel Ketua / Sekretaris KONI Kabupaten / Kota</p>
                    <p style="font-size: 9px; margin: 0; margin-bottom: 5px;">*Wajib TTD dan Cap Stampel Ketua / Sekretaris Pengkab / Pengkot</p>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 15px;">
                    <p style="text-align: center; font-size: 12px; margin: 0; margin-bottom: 10px;">Formulir Pendaftaran Tahap 2 ini diterima oleh</p>
                    <p style="text-align: center; font-size: 12px; margin: 0; margin-bottom: 10px;">Panitia Besar PORPROV XII Tahun 2023 Kalimantan Tengah ${data.city}</p>
                    <p style="text-align: center; font-size: 12px; margin: 0; margin-bottom: 10px;">Pada Tanggal 19 Juni 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
  return html;
};

export const attachmentSecondStepEmail = (photoUrl: string, ijazahUrl: string) => {
    const photo = path.join(process.cwd(), photoUrl);
    const ijazah = path.join(process.cwd(), ijazahUrl);
    const base64Photo = photoUrl === "" ? "" : "data:image/png;base64," + fs.readFileSync(photo, { encoding: "base64" });
    const base64Ijazah = ijazahUrl === "" ? "" : "data:image/png;base64," + fs.readFileSync(ijazah, { encoding: "base64" })
    return `
        <div style="display: flex; flex-direction: column; margin-top: 15px;">
            <p style="text-align: center; font-size: 16px; font-weight: 60; margin: 0; margin-bottom: 20px; width: 100%;">Lampiran</p>
            <p style="text-align: center; font-size: 12px; margin: 0; margin-bottom: 10px; width: 100%;">Foto KTP</p>
            <img src="${base64Photo}" style="width: 100%; height: 15vh; object-fit: contain;" />
            <p style="text-align: center; font-size: 12px; margin: 0; margin-bottom: 10px; width: 100%;">Foto Ijazah</p>
            <img src="${base64Ijazah}" style="width: 100%; height: 40vh; object-fit: contain;" />
        </div>
    `
}

export default registrationSecondStepEmail;