function demoFromHTML() {
  html2canvas(document.querySelector("#content")).then(function(canvas) {
    document.body.appendChild(canvas);
    var pdf = new jsPDF("p", "pt", "a4");
    var pdfConf = {
      background: "#fff"
    };

    pdf.addHTML(document.getElementById("content"), pdfConf, function() {
      pdf.save("web.pdf");
    });
  });
}

(function() {
  function currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;

      today = dd + "-" + mm + "-" + yyyy;
    }
    console.log(today);
    $(".date").datepicker({ dateFormat: "dd-mm-yy" });
    $(".date").attr("value", today);
  }

  function Input(el) {
    this.el = el;
    this.er = 0;

    this.create_node = 0;
    this.inputs = document.getElementsByTagName("input");
    this.content = document.getElementById("content");
  }
  Input.prototype.getDomElement = function() {
    for (let i = 0; i < this.el.array.length; i++) {
      var show = document.getElementsByClassName(this.el.array[i].name);
      for (let j = 0; j <= show.length - 1; j++) {
        if ("name" in this.el.array[i]) {
          this.canvasElement(show[j]);
        }
        if ("regexp" in this.el.array[i]) {
          this.shownumber(show[j], i, j);
        }
      }
    }
    for (let x = 0; x < this.el.info_array.length; x++) {
      this.addNode(
        document.getElementById("canvas-inf"),
        this.el.info_array[x].value,
        this.el.info_array[x].name,
        this.el.info_array[x].name
      );
    }
  };
  Input.prototype.canvasElement = function(element) {
    var number = document.getElementById("canvas-number");
    var date = document.getElementById("canvas-date");
    var merchant = document.getElementById("canvas-merchant");
    var client = document.getElementById("canvas-client");
    var sign = document.getElementById("canvas-inf");
    var text = element.id.replace("-", " ");

    if (element.id.indexOf("nr-Faktury") !== -1) {
      this.addNode(number, element.value, element.id, "Faktura VAT nr");
    }
    if (element.id.indexOf("data") !== -1) {
      this.addNode(date, element.value, element.id, text);
    }
    if (element.id.indexOf("sprzedaw") !== -1) {
      this.addNode(merchant, element.value, element.id, text);
    }
    if (element.id.toLowerCase().indexOf("nabyw") !== -1) {
      this.addNode(client, element.value, element.id, text);
    }
  };

  Input.prototype.shownumber = function(val, i, j) {
    var reg = new RegExp(this.el.array[i].regexp);

    if (reg.test(val.value)) {
      if (val.classList.contains("ErrorClass")) {
        val.classList.remove("ErrorClass");
      }

      if (this.er === 0) {
        if (this.create_node < this.inputs.length - 1) {
          let idname = document.getElementsByClassName(this.el.array[i].name)[j]
            .id;
          this.addToListNode(val.value, idname);
        }
        this.create_node++;
      }
    } else {
      this.displayError(val, this.el.ErrorMsg[i]);
      this.er++;
    }
  };

  Input.prototype.addToListNode = function(value, id) {
    var newNodes = {};
    var nodeList = [];
    var content = document.getElementById("content");
    newNodes.content = content;
    newNodes.value = value;
    newNodes.id = id;
    nodeList.push(newNodes);
  };

  Input.prototype.calcVat = function() {
    var amount = document.getElementById("amount");
    var nettoPrice = document.getElementById("netto-price");
    var nettoWorth = document.getElementById("netto-worth");
    var amountVat = document.getElementById("amount-vat");
    var bruttoworth = document.getElementById("brutto-worth");

    nettoPrice.addEventListener("input", function() {
      var rateVat = document.getElementById("VAT-rate").value.replace("%", "");
      var parseAmount = parseFloat(amount.value);
      var parseNettoPrice = parseFloat(nettoPrice.value);
      var parserateVat = parseFloat(rateVat);
      var worthNetto = parseAmount * parseNettoPrice;

      if (worthNetto > 0) {
        worthNetto = Math.round(worthNetto * 100) / 100;
        nettoWorth.value = worthNetto;
        amountVat.value = (parserateVat * worthNetto) / 100;
        bruttoworth.value = worthNetto + parseFloat(amountVat.value);
      } else {
        nettoWorth.value = 0;
      }
    });
  };

  Input.prototype.createTable = function() {
    this.tblbtn = document.getElementById("ipt-table");
    this.tblbtn.addEventListener("click", function(e) {
      if (e.target && e.target.id == "btn-table") {
        var tablediv = document.getElementById("ipt-table");
        var table = document.getElementsByTagName("table")[0];
        var clone = table.cloneNode(true);
        tablediv.appendChild(clone);
        console.log(tablediv);
      }
    });
  };

  Input.prototype.createContentTable = function() {
    var contentbl = document.getElementsByTagName("table")[0];
    var theaders = contentbl.rows[0].cells;
    var tdata = contentbl.rows[1].cells;
    var tbody = document.createElement("tbody");

    var table = document.createElement("table");
    for (var i = 0; i < 1; i++) {
      var trh = document.createElement("tr");
      var trd = document.createElement("tr");
      for (var j = 0; j < contentbl.rows[0].cells.length; j++) {
        if (theaders[j].innerHTML !== "dodaj tabelę") {
          var td = document.createElement("td");
          var th = document.createElement("th");

          var text1 = document.createTextNode(theaders[j].innerHTML);
          var text2 = document.createTextNode(tdata[j].firstChild.value);

          th.appendChild(text1);
          td.appendChild(text2);
          trh.appendChild(th);
          trd.appendChild(td);
        }
      }

      tbody.appendChild(trh);
      tbody.appendChild(trd);
      table.appendChild(tbody);
    }
    document.getElementById("canvas-table").appendChild(table);
  };

  Input.prototype.display = function() {
    var that = this;
    this.button = document.getElementById("btn");
    this.button.addEventListener(
      "click",
      function() {
        that.getDomElement();

        that.createContentTable();

        demoFromHTML();
      },
      false
    );
  };
  Input.prototype.addNode = function(parrent, value, id, text) {
    var para = document.createElement("p");

    var node = document.createTextNode(text + ": " + value);

    para.appendChild(node);
    para.setAttribute("id", "canvas-" + id);
    parrent.appendChild(para);
  };

  var namesv = new Input({
    array: [
      { name: "number" },
      { name: "date" },
      { name: "Name" },
      { name: "Adress" },
      { name: "Postal", regexp: "\\d{2}-\\d{3}" },
      { name: "NIP", regexp: "^[0-9]{10}$" },
      { name: "REGON", regexp: "^[0-9]{9}$" }
    ],
    info_array: [
      {
        name: "Razem do zapłaty",
        value: document.getElementById("brutto-worth").value
      }
    ],
    ErrorMsg: [
      "Przykład poprawnego użycia: 00-000",
      "Niepoprawny NIP",
      "Niepoprawny REGON"
    ]
  });

  namesv.calcVat();
  namesv.createTable();
  namesv.display();

  currentDate();
})(jQuery);
