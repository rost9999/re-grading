function download() {
  let filename = "report.txt";
  let text = result;
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const choice_mag = () => {
  let mag = document.getElementById("mag").value;
  document.getElementById("mag_lable").innerHTML = "Магазин: " + mag;
};

let jbarcode = {};
var xhr = new XMLHttpRequest();
xhr.open("GET", "/data.txt", false);
xhr.send();
let bar_code1 = xhr.responseText.split("\n");
let bar_code = bar_code1.map(function (item) {
  return item.replace("_", "").split("\t");
});
let item;
for (item of bar_code) {
  jbarcode[item[0]] = [item[1]];
}

let result = "";

const clear = () => {
  document.getElementById("Name").innerHTML = "";
  document.getElementById("Count").innerHTML = "";
};

const search = () => {
  let input = document.getElementById("search").value;
  let inputCount = document.getElementById("incount").value;
  let table = document.getElementById("table1");
  if (input === "") {
    clear();
  }
  if (input in jbarcode) {
    console.log(input);
    let colon = document.createElement("tr");
    let aricle = document.createElement("th");
    let name = document.createElement("th");
    // let count = document.createElement("th");
    let fact = document.createElement("th");
    aricle.innerHTML = input;
    name.innerHTML = jbarcode[input];
    // count.innerHTML = jbarcode[input][1];
    fact.innerHTML = inputCount;
    console.log(jbarcode[input][0]);
    result +=
      input + "\t" + jbarcode[input][0].trim() + "\t" + inputCount + "\n";
    colon.append(aricle);
    colon.append(name);
    // colon.append(count);
    colon.append(fact);
    table.append(colon);
    // document.getElementById("Name").innerHTML = bar_code[input][0];
    // document.getElementById("Count").innerHTML = inputCount;
  } else {
    document.getElementById("iferror").innerHTML = "помилка штрих-коду";
  }
  document.getElementById("search").value = "";
  document.getElementById("incount").value = "";
};

const button = document.getElementById("button");
button.addEventListener("click", search);

const buttonsendReport = document.getElementById("send_report");
buttonsendReport.addEventListener("click", download);

const buttonMag = document.getElementById("choice_mag");
buttonMag.addEventListener("click", choice_mag);
