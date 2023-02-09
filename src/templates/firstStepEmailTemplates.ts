import { IFirstStepData, IFirstStepClassData, IFirstStepRegistrationsData } from "../interfaces/FirstStepEmail";

const registrationFirstStepEmail = function (dataString: string) {
  const data: IFirstStepData = JSON.parse(dataString);
  const putraCount = data.class.reduce((acc: number, item: IFirstStepClassData) => {
    const putra = item.registrations.find((reg: IFirstStepRegistrationsData) => reg.name === "Putra");
    if (putra) {
      return acc + putra.total;
    }
    return acc;
  }, 0);
  const putriCount = data.class.reduce((acc: number, item: IFirstStepClassData) => {
    const putri = item.registrations.find((reg: IFirstStepRegistrationsData) => reg.name === "Putri");
    if (putri) {
      return acc + putri.total;
    }
    return acc;
  }, 0);
  const campuranCount = data.class.reduce((acc: number, item: IFirstStepClassData) => {
    const campuran = item.registrations.find((reg: IFirstStepRegistrationsData) => reg.name === "Campuran");
    if (campuran) {
      return acc + campuran.total;
    }
    return acc;
  }, 0);
  const countAll = putraCount + putriCount + campuranCount;
  
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
              <h5>KABUPATEN/KOTA ${data.city.toUpperCase()}</h5>
              <hr>
              <div class="space-y-3">
                <style type="text/css">
                  .tg  {border-collapse:collapse;border-spacing:0;}
                  .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                  overflow:hidden;padding:10px 5px;word-break:normal;}
                  .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                  .tg .tg-nrix{text-align:center;vertical-align:middle}
                </style>
                <table class="tg" style="undefined;table-layout: fixed; width: 542px">
                  <colgroup>
                    <col style="width: 150px">
                    <col style="width: 150px">
                    <col style="width: 75px">
                    <col style="width: 75px">
                    <col style="width: 75px">
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="tg-cly1" colspan="5">
                        CABANG OLAHRAGA: ${data.sport.toUpperCase()}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-nrix" rowspan="2">Jumlah Nomor Perlombaan / Pertandingan</td>
                      <td class="tg-nrix" rowspan="2">Nomor Perlombaan / Pertandingan yang ditetapkan</td>
                      <td class="tg-nrix" colspan="3">Nomor yang diikuti dan Jumlah Peserta</td>
                    </tr>
                    <tr>
                      <td class="tg-nrix">Putra</td>
                      <td class="tg-nrix">Putri</td>
                      <td class="tg-nrix">Campuran</td>
                    </tr>
                    ${data.class.map((item: IFirstStepClassData, index: number) => `
                    <tr>
                      <td class="tg-nrix">${index + 1}</td>
                      <td class="tg-nrix">${item.name}</td>
                      <td class="tg-nrix">${item.registrations?.[0]?.total ?? 0}</td>
                      <td class="tg-nrix">${item.registrations?.[1]?.total ?? 0}</td>
                      <td class="tg-nrix">${item.registrations?.[2]?.total ?? 0}</td>
                    </tr>
                    `).join("")}
                    <tr>
                      <td class="tg-nrix" rowspan="2">Jumlah : ${data.class.length}</td>
                      <td class="tg-nrix" rowspan="2">Jumlah Atlet</td>
                      <td class="tg-nrix">${putraCount}</td>
                      <td class="tg-nrix">${putriCount}</td>
                      <td class="tg-nrix">${campuranCount}</td>
                    </tr>
                    <tr>
                      <td class="tg-nrix" colspan="3">${countAll}</td>
                    </tr>
                  </tbody>
                </table>
                <hr>
                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 65px;">
                  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.35;">
                    <p style="text-align: center; font-size: 16px; font-weight: 600;">SIGIT K. YUNIANTO</p>
                    <p style="text-align: center; font-size: 12px; border-top: 1px solid #000;">Tanda Tangan Ketua Umum / Sekretaris Umum dan Cap KONI Kabupaten / Kota</p>
                  </div>
                  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.3;">
                    <p style="text-align: center; font-size: 12px;">04-Jul-18</p>
                    <p style="text-align: center; font-size: 12px;">Tanggal</p>
                  </div>
                  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.35;">
                    <p style="text-align: center; font-size: 16px; font-weight: 600;">KARUHEI</p>
                    <p style="text-align: center; font-size: 12px; border-top: 1px solid #000;">Tanda Tangan Ketua Umum / Sekretaris Umum dan Cap Pengkab / Komda</p>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 15px;">
                	<p style="text-align: center; font-size: 12px;">Formulir Pendaftaran Tahap 1 ini diterima oleh</p>
                  <p style="text-align: center; font-size: 12px;">Panitia Besar PORPROV XII Tahun 2023 Kalimantan Tengah ${data.city}</p>
                  <p style="text-align: center; font-size: 12px; font-weight: 600;">Pada Tanggal 9 s/d 10 Februari 2023 di Palangkaraya</p>
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

export default registrationFirstStepEmail;