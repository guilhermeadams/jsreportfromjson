document.addEventListener("DOMContentLoaded", function () {
  const orgaoSelect = document.getElementById("orgao");
  const codigoSelect = document.getElementById("codigo");
  const comentarioTextarea = document.getElementById("comentarios"); // Added for comentarios
  const impressaoDiagnosticaTextarea = document.getElementById(
    "impressao_diagnostica"
  ); // Add this ID to your HTML

  fetch(
    "https://gist.githubusercontent.com/guilhermeadams/dcbbb870a9d3e857c9d2a30beb96e3ef/raw/0133d11dc2d33074107a935536fb198105250082/codes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const orgaos = new Set(data.map((item) => item.orgao));
      orgaos.forEach((orgao) => {
        const option = document.createElement("option");
        option.value = orgao;
        option.textContent = orgao;
        orgaoSelect.appendChild(option);
      });

      orgaoSelect.addEventListener("change", function () {
        const selectedOrgao = this.value;
        codigoSelect.innerHTML = '<option value="">Selecione...</option>';
        data
          .filter((item) => item.orgao === selectedOrgao)
          .forEach((item) => {
            const option = document.createElement("option");
            option.value = item.codigo;
            option.textContent = item.codigo;
            codigoSelect.appendChild(option);
          });
      });

      codigoSelect.addEventListener("change", function () {
        const selectedCodigo = this.value;
        const item = data.find((item) => item.codigo === selectedCodigo);
        comentarioTextarea.value = item ? item.comentario : ""; // Display comentario
        impressaoDiagnosticaTextarea.value = item
          ? item.impressao_diagnostica
          : ""; // Display impressao_diagnostica
      });
    })
    .catch((error) => console.error("Error loading the JSON data:", error));
});
