document.getElementById("export-pdf").addEventListener("click", function () {
  html2canvas(document.body, {
    useCORS: true, // Позволяет использовать изображения из других доменов
    onrendered: function (canvas) {
      var imgData = canvas.toDataURL("image/png");
      var pdf = new jsPDF("p", "mm", "a4"); // Портретная ориентация, мм, размер A4
      var imgWidth = 210; // Ширина страницы PDF
      var pageHeight = 295; // Высота страницы PDF
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      var position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    },
  });
});

function waitForImages() {
  return new Promise((resolve) => {
    const images = Array.from(document.images);
    let loadedImages = 0;

    if (images.length === 0) {
      resolve();
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === images.length) {
          resolve();
        }
      } else {
        img.addEventListener("load", () => {
          loadedImages++;
          if (loadedImages === images.length) {
            resolve();
          }
        });
        img.addEventListener("error", () => {
          loadedImages++;
          if (loadedImages === images.length) {
            resolve();
          }
        });
      }
    });
  });
}

document
  .getElementById("export-pdf")
  .addEventListener("click", async function () {
    await waitForImages();
    html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
    }).then(function (canvas) {
      var imgData = canvas.toDataURL("image/png");
      var pdf = new jsPDF("p", "mm", "a4");
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      var position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    });
  });

document
  .getElementById("export-pdf")
  .addEventListener("click", async function () {
    await waitForImages(); // Ждём, пока изображения полностью загрузятся

    html2canvas(document.getElementById("pdf-content"), {
      useCORS: true,
      allowTaint: true,
    }).then(function (canvas) {
      var imgData = canvas.toDataURL("image/png");

      // Ограничиваем ширину изображения
      var imgWidth = 1200; // ширина в px, которую ты хочешь
      var pageWidth = 210; // ширина PDF-страницы в мм
      var pageHeight = 295; // высота PDF-страницы в мм

      // Пропорции изображения
      var imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Создаем PDF
      var pdf = new jsPDF("p", "mm", "a4");

      // Масштабируем изображение в соответствии с PDF-форматом
      var scale = pageWidth / imgWidth;
      var scaledImgHeight = imgHeight * scale;

      // Если высота изображения больше страницы, разбиваем на страницы
      var heightLeft = scaledImgHeight;
      var position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, scaledImgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, scaledImgHeight);
        heightLeft -= pageHeight;
      }

      // Сохраняем PDF
      pdf.save("document.pdf");
    });
  });

function printPage() {
  window.print();
}
