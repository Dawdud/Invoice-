

function demoFromHTML()
{

    html2canvas(document.querySelector("#content")).then(function(canvas) {

        document.body.appendChild(canvas);
        var pdf = new jsPDF('p', 'pt', 'a4');
        var  pdfConf = {
            background: '#fff'
        };

        pdf.addHTML(document.getElementById('content'),pdfConf, function() {
            pdf.save('web.pdf');
        });
    });

}





(function () {

function currentDate()
{
var today= new Date();
var dd= today.getDate();
var mm= today.getMonth()+1;
var yyyy= today.getFullYear();
if(dd<10)
{
  dd='0'+dd;
}
if(mm<10)
{
  mm='0'+mm;

today=dd+'-'+mm+'-'+yyyy;}
console.log(today);
$('.date').datepicker({ dateFormat: 'dd-mm-yy' });
$('.date').attr('value',today);
}


function Input(el,length)
{
    this.el=el;
    this.er=0;
    this.create_node=0;
    this.inputs= document.getElementsByTagName('input');

}
Input.prototype.getDomElement= function()
{
    for(var i=0; i<this.el.name.length; i++) {
        var show = document.getElementsByClassName(this.el.array[i].name);
        for (let j = 0; j <= show.length-1; j++) {
            this.shownumber(show[j], i,j);
        }

    }

};

Input.prototype.shownumber= function(val,i,j)
{

            var reg = new RegExp(this.el.regexp[i]);

            if (reg.test(val.value)) {

                if(val.classList.contains('ErrorClass'))
                {
                    val.classList.remove('ErrorClass');

                }

                if(this.er===0) {

                  if(this.create_node<this.inputs.length-1)
                  {
                        let idname= document.getElementsByClassName(this.el.array[i].name)[j].id;
                        this.addToListNode(val.value, idname);

                  }
                  this.create_node++;

                }

            }

            else {

                this.displayError(val,this.el.ErrorMsg[i]);
                this.er++;
            }


};

Input.prototype.addToListNode= function(value, id)
{
    var newNodes= {};
    var nodeList=[];
    var content=document.getElementById('content');
    newNodes.content= content;
    newNodes.value= value;
    newNodes.id= id;
    nodeList.push(newNodes);

};

Input.prototype.displayError= function(name, error)
    {

      //TODO this is not finished
      name.className+='  ErrorClass';
      document.getElementById("#content").innerHTML="";
      var errordiv= document.createElement("div");
      errordiv.classList.add("ErrorDiv");
      errordiv.innerHTML="<h3>"+error+"</h3>";


    };

Input.prototype.removeElement= function()
{
    var edv= document.getElementsByClassName("ErrorDiv");

    if(this.er>0 && edv!==undefined)
    {
        for(let x=0; x<edv.length; x++) {


            edv[x].style.display = "none";
            edv[x].parentNode.removeChild(edv[x]);
        }

    }

};
Input.prototype.calcVat=function()
    {
        var amount= document.getElementById('amount');
        var nettoPrice= document.getElementById('netto-price');
        var nettoWorth= document.getElementById('netto-worth');
        var amountVat= document.getElementById('amount-vat');
        var bruttoworth=  document.getElementById('brutto-worth');


        nettoPrice.addEventListener('input', function()
        {
         var rateVat= document.getElementById('VAT-rate').value.replace('%','');
         var  parseAmount=parseFloat(amount.value);
         var  parseNettoPrice= parseFloat(nettoPrice.value);
         var  parserateVat= parseFloat(rateVat);
         var  worthNetto= parseAmount* parseNettoPrice;


         if(worthNetto>0)
         {
             worthNetto= Math.round(worthNetto*100)/100;
             nettoWorth.value= worthNetto;
             amountVat.value= (parserateVat*worthNetto)/100;
             bruttoworth.value= worthNetto + parseFloat(amountVat.value);
         }
         else
         {
             nettoWorth.value=0;
         }
        })

    };

Input.prototype.createTable= function()
{

    this.tblbtn= document.getElementById('ipt-table');
    this.tblbtn.addEventListener('click', function(e){
        if(e.target && e.target.id=='btn-table') {


            var tablediv = document.getElementById('ipt-table');
            var table = document.getElementsByTagName('table')[0];
            var clone = table.cloneNode(true);
            tablediv.appendChild(clone);
            console.log(tablediv);
        }
    });

};
Input.prototype.createContentTable= function()
{
    var contentbl= document.getElementsByTagName('table')[0];
    var theaders= contentbl.rows[0].cells;
    var tdata= contentbl.rows[1].cells;
    var tbody=  document.createElement('tbody');

    var table = document.createElement('table');
    for (var i = 0; i < 1; i++){
        var trh = document.createElement('tr');
        var trd= document.createElement('tr');
        for(var j=0; j<contentbl.rows[0].cells.length; j++) {

            var td=  document.createElement('td');
            var th = document.createElement('th');



            var text1 = document.createTextNode(theaders[j].innerHTML);
            var text2 = document.createTextNode(tdata[j].firstChild.value);


            th.appendChild(text1);
            td.appendChild(text2);
            trh.appendChild(th);
            trd.appendChild(td);
        }


        tbody.appendChild(trh);
        tbody.appendChild(trd);
        table.appendChild(tbody);
    }
    document.getElementById('content').appendChild(table);

};

Input.prototype.display= function()
{
var that= this;
this.button= document.getElementById('btn');
this.button.addEventListener('click',function(){


    that.removeElement();
    that.getDomElement();

    that.createContentTable();

    that.er=0;



}, false)

};
Input.prototype.addNode= function(parrent,value, id)
{
    var para= document.createElement("p");

    var node = document.createTextNode(id+": "+value);

    para.appendChild(node);
    para.setAttribute("id","canvas-"+id);
    parrent.appendChild(para);
};

var namesv= new Input({array: [{name:"", regexp:""},{name:"Postal", regexp:"\\d{2}-\\d{3}"}, {name:"NIP", regexp:"^[0-9]{10}$"},{name:"REGON", regexp:"^[0-9]{9}$"}],
    ErrorMsg:[

        "Przykład poprawnego użycia: 00-000","Niepoprawny NIP", "Niepoprawny REGON"],
    regexp:["","\\d{2}-\\d{3}","^[0-9]{10}$", "^[0-9]{9}$"]});

namesv.calcVat();
namesv.createTable();
namesv.display();

currentDate();
})(jQuery);
