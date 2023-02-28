import { IFirstStepData, IFirstStepClassData } from "../interfaces/FirstStepEmail";

const month = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sept","Okt","Nov","Des"];

const registrationFirstStepEmail = function (dataString: string) {
  const data: IFirstStepData = JSON.parse(dataString);
  const putraCount = data.class.reduce((acc: number, item: IFirstStepClassData) => {
    const putra = item.registrations.filter(t => t.name === 'Laki - Laki');
    if (putra.length > 0) {
      return putra.reduce((acc: number, item: any) => acc + item.total, 0);
    }
    return acc;
  }, 0);
  const putriCount = data.class.reduce((acc: number, item: IFirstStepClassData) => {
    const putri = item.registrations.filter(t => t.name === 'Perempuan');
    if (putri.length > 0) {
      return putri.reduce((acc: number, item: any) => acc + item.total, 0);
    }
    return acc;
  }, 0);
  const campuranCount = data.class.reduce((acc: number, item: IFirstStepClassData) => {
    const campuran = item.registrations.filter(t => t.name === 'Campuran');
    if (campuran.length > 0) {
      return campuran.reduce((acc: number, item: any) => acc + item.total, 0);
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
                  .tg  {width:100%;border-collapse:collapse;border-spacing:0;border:solid 1px #000000;}
                  .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:10px;
                  overflow:hidden;padding:10px 5px;word-break:normal;border:solid 1px #000000;}
                  .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;border:solid 1px #000000;}
                  .tg .tg-nrix{text-align:center;vertical-align:middleborder:solid 1px #000000;}
                </style>
                <table class="tg">
                  <colgroup>
                    <col style="width: 200px">
                    <col style="width: 200px">
                    <col style="width: 125px">
                    <col style="width: 125px">
                    <col style="width: 125px">
                  </colgroup>
                  <thead>
                    <tr>
                      <th colspan="5">
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
                      <td class="tg-nrix">${item.registrations?.find(t => t.name === 'Laki - Laki')?.total ?? 0}</td>
                      <td class="tg-nrix">${item.registrations?.find(t => t.name === 'Perempuan')?.total ?? 0}</td>
                      <td class="tg-nrix">${item.registrations?.find(t => t.name === 'Campuran')?.total ?? 0}</td>
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
                    <p style="text-align: center; font-size: 16px; font-weight: 600;"></p>
                    <p style="text-align: center; font-size: 12px; border-top: 1px solid #000;">Tanda Tangan Ketua Umum / Sekretaris Umum dan Cap KONI Kabupaten / Kota</p>
                  </div>
                  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.3;">
                    <p style="text-align: center; font-size: 12px;">${new Date().getDate()}-${month[new Date().getMonth()]}-${new Date().getFullYear()}</p>
                    <p style="text-align: center; font-size: 12px;">Tanggal</p>
                  </div>
                  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 0.35;">
                    <p style="text-align: center; font-size: 16px; font-weight: 600;"></p>
                    <p style="text-align: center; font-size: 12px; border-top: 1px solid #000;">Tanda Tangan Ketua Umum / Sekretaris Umum dan Cap Pengkab / Komda</p>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 15px;">
                	<p style="text-align: center; font-size: 12px;">Formulir Pendaftaran Tahap 1 ini diterima oleh</p>
                  <p style="text-align: center; font-size: 12px;">Panitia Besar PORPROV XII Tahun 2023 Kalimantan Tengah</p>
                  <p style="text-align: center; font-size: 12px;">Pada JUNI 2023</p>
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