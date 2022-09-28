const form = document.querySelector("form")
const fileInput = document.querySelector("input")
const qr_content = document.querySelector(".qr-content")
const qr_text = qr_content.querySelector("textarea")

function fetchRequest(formData, file) {
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST", body: formData
  }).then(res => res.json()).then(result => {
    qr_content.style = "";

    result = result[0].symbol[0].data
    form.querySelector("img").src = URL.createObjectURL(file)
    qr_text.innerText = result ? result : "Error: Couldn't scan"
    if (!result) {
      qr_text.style = "color: #ff0000;"
      return
    }
  })
}

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0]
  let formData = new FormData()
  formData.append("file", file)
  fetchRequest(formData, file)
})

