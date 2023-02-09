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
              <h1 class="h3 mb-2">Kabupaten / Kota ${data.city}</h1>
              <h5 class="text-teal-700">Cabang Olahraga: ${data.sport}</h5>
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
                      <th class="tg-nrix" rowspan="2">Jumlah Nomor Perlombaan / Pertandingan</th>
                      <th class="tg-nrix" rowspan="2">Nomor Perlombaan / Pertandingan yang ditetapkan</th>
                      <th class="tg-nrix" colspan="3">Nomor yang diikuti dan Jumlah Peserta</th>
                    </tr>
                    <tr>
                      <th class="tg-nrix">Putra</th>
                      <th class="tg-nrix">Putri</th>
                      <th class="tg-nrix">Campuran</th>
                    </tr>
                  </thead>
                  <tbody>
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