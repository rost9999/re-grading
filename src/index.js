let mag = 'Не вибрано';
function download() {
  let filename = "report.txt";
  let text = get_text();
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
const get_text = () => {
  let text = "Штрих-код Артикул	Назва	Кількість\nКонтрагент "+mag+'\n';
  for (let a in result) {
    text +=
    getbarcode[a][0].trim() +
     "\t" +
      a +
      "\t" +
      jbarcode[a][0].trim() +
      "\t" +
      result[a] +
      "\n";
  }
  return text;
};

const get_data = (path) => {
  let jbarcode = {};
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/" + path, false);
  xhr.send();
  let bar_code1 = xhr.responseText.split("\n");
  let bar_code = bar_code1.map(function (item) {
    return item.replace("_", "").split("\t");
  });
  for (let item of bar_code) {
    jbarcode[item[0]] = [item[1]];
  }
  return jbarcode;
};

let jbarcode = get_data("data.txt");
let realbarcode = get_data("bar-code.txt");
let getbarcode = get_data("getbar-code.txt");

const choice_mag = () => {
  mag = document.getElementById("mag").value;
  console.log(mag);
  document.getElementById("mag_lable").innerHTML = "Магазин: " + mag;
  // let magdata = get_data(mag + ".txt");
  // for (let m in magdata) {
  //   try {
  //     jbarcode[m].push(magdata[m][0]);
  //   } catch (error) {
  //   }
  // }
};

let result = {};
// result += "Артикул	Назва	Факт	Залишок\n";
const clear = () => {
  document.getElementById("Name").innerHTML = "";
  document.getElementById("Count").innerHTML = "";
};
const inputFocus = () => {
  document.getElementById("incount").focus();
};
const search = () => {
  let input = document.getElementById("search").value;
  let inputCount = document.getElementById("incount").value;
  let table = document.getElementById("table1");
  if (input in realbarcode) {
    input = realbarcode[input][0].trim();
    console.log(input);
  }
  if (input in jbarcode) {
    console.log(input);
    let colon = document.createElement("tr");
    let bar_code = document.createElement("th");
    let aricle = document.createElement("th");
    let name = document.createElement("th");
    // let count = document.createElement("th");
    let fact = document.createElement("th");
    
    aricle.innerHTML = input.trim();
    name.innerHTML = jbarcode[input][0].trim();
    bar_code.innerHTML = getbarcode[input][0].trim();
    // count.innerHTML = jbarcode[input][1];
    fact.innerHTML = inputCount.trim();
    /*     result +=
      input +
      "\t" +
      jbarcode[input][0].trim() +
      "\t" +
      inputCount +
      "\t" +
      jbarcode[input][1] +
      "\n"; */
    if (!(input in result)) {
      result[input] = parseInt(inputCount);
    } else {
      result[input] += parseInt(inputCount);
    }
    console.log(result);

    colon.append(bar_code);
    colon.append(aricle);
    colon.append(name);
    colon.append(fact);

    table.append(colon);
    document.getElementById("iferror").innerHTML = "";
    // document.getElementById("Name").innerHTML = bar_code[input][0];
    // document.getElementById("Count").innerHTML = inputCount;
  } else {
    document.getElementById("iferror").innerHTML = "помилка штрих-коду";
  }
  document.getElementById("search").value = "";
  document.getElementById("incount").value = "";
  document.getElementById("search").focus();
};

const button = document.getElementById("button");
button.addEventListener("click", search);
document.getElementById("search").addEventListener("keypress", inputFocus);

const buttonsendReport = document.getElementById("send_report");
buttonsendReport.addEventListener("click", download);

const buttonMag = document.getElementById("choice_mag");
buttonMag.addEventListener("click", choice_mag);
