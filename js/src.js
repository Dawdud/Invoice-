function demoFromHTML()
{
    var pdf= new jsPDF('p', 'pt', 'letter');
    source= $('#content')[0];
    specialElementHandlers={
        '#bypassme':function(element,renderer)
        {
            return true
        }
    };
    margins={
        top: 80,
        bottom:60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
        source,
        margins.left,
        margins.top,
        {'width': margins.width,
        'elementHandlers': specialElementHandlers},
        function (){
            pdf.save('Test.pdf');
        },
        margins
    );

}

(function () {


function Input(el)
{
    this.el=el;
    this.er=0;

}
Input.prototype.shownumber= function()
{
    for(var i=0; i<this.el.name.length; i++) {
        var show = document.getElementsByClassName(this.el.name[i]);
        for (let j = 0; j < show.length; j++) {


            var reg = new RegExp(this.el.regexp[i]);
            if (reg.test(show[j].value)) {

                if(show[j].classList.contains('ErrorClass'))
                {
                    show[j].classList.remove('ErrorClass');




                }
                var content=document.getElementById('content');
                if(this.er===0) {


                    this.addNode(content, show[j].value);
                }

            }

            else {

                this.displayError(show[j],this.el.ErrorMsg[i]);
                this.er++;
            }


        }
    }
};
Input.prototype.displayError= function(name, error)
    {


      name.className+='  ErrorClass';
      document.getElementById("content").innerHTML="";
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
Input.prototype.display= function()
{
var that= this;
this.button= document.getElementById('btn');
this.button.addEventListener('click',function(){
    that.removeElement();
    that.shownumber();
    console.log(that.er);
    that.er=0;


}, false)

};
Input.prototype.addNode= function(parrent,value)
{
    var para= document.createElement("p");
    var node = document.createTextNode(value);
    para.appendChild(node);
    parrent.appendChild(para);
};

var namesv= new Input({name: ['number','Name','Adress',"Postal", "NIP","REGON"],
    ErrorMsg:["",""
        ,"",
        "Przykład poprawnego użycia: 00-000","Niepoprawny NIP", "Niepoprawny REGON"],
    regexp:["","","","\\d{2}-\\d{3}","^[0-9]{10}$", "^[0-9]{9}$"]});

namesv.display()
})(jQuery);


