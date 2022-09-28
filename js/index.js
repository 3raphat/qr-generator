let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", () => {
  let text = document.querySelector("#input-text");
  let size = document.querySelector("#size");
  let format = document.querySelector("#format");

  if (text.value != "") {
    if (qr_code_element.childElementCount == 0) {
      generate(text, size, format);
    } else {
      qr_code_element.innerHTML = ""
      generate(text, size, format);
    }
  } else {
    qr_code_element.style = "display: none";
  }
});

function generate(text, size, format) {
  qr_code_element.style = "";

  var qrcode = new QRCode(qr_code_element, {
    text: `${text.value}`,
    width: `${size.value}`,
    height: `${size.value}`,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  let download_link = document.createElement("a");

  download_link.classList.add("btn");
  download_link.setAttribute("download", `qr_code.${format.value}`);
  download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;
  
  qr_code_element.appendChild(download_link);

  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_canvas = document.querySelector("canvas");

  if (qr_code_img.getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    }, 300);
  }
}
