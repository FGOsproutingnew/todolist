window.addEventListener('load',function () {
    let tab=document.querySelectorAll('.tab>li');
    let prev=0;
    let type="all";
    let todolist=[{id:1,content:'今天也是充满希望的一天',ctime:'2019/6/4',status:false},
        {id:2,content:'上午打乌龟',ctime:'2019/6/4',status:false},
        {id:3,content:'下午打卢克',ctime:'2019/6/4',status:true},
        {id:4,content:'晚上躺鸟背',ctime:'2019/6/4',status:false},
    ];

    let str=localStorage.getItem('todolist');
    if(!str){
        saveDate();
        str=localStorage.getItem('todolist');
}
    todolist=JSON.parse(str);
    let content=document.querySelector('.content');
    function render(arr){
        let html='';
        arr.forEach(elem=>{
            if(elem.status){
                html +=`<li id="${elem.id}"><input type="checkbox" checked="checked" }><p>${elem.content}</p><del>X</del><time>${elem.ctime}</time></li>`
            }else{
                html +=`<li id="${elem.id}"><input type="checkbox"}><p>${elem.content}</p><del>X</del><time>${elem.ctime}</time></li>`
            }
        });
        content.innerHTML=html;
    }


    tab.forEach(function (ele,index) {
        ele.onclick=function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;
            type = this.getAttribute('type');
            saveDate();
            render(filterData(type));
        }
    });
    function filterData(type){
        let arr=[];
        switch(type){
            case 'all':
                arr =todolist;
                break;
            case 'done':
                arr =todolist.filter(ele=>ele.status);
                break;
            case 'doing':
                arr =todolist.filter(ele=>!ele.status);
                break;
        }
        return arr;
    }

    tab[0].onclick();
    //删除或选中
    content.onclick=function(e){
        let target=e.target;
        let id=target.parentNode.id;
        if(target.nodeName == "DEL"){
            todolist= todolist.filter(ele=>ele.id !==id);
           let index= todolist.findIndex(ele=>ele.id==id);
            todolist.splice(index,1);
        }else if((target.nodeName == "INPUT")){
            let ele=todolist.filter(ele=>ele.id==id)[0];
            ele.status=target.checked;
        }
        saveDate();
        render(filterData(type))
    }


    //更新
    let forms=document.forms[0];
    let textBtn=forms.elements[0];
    let submitBtn=forms.elements[1];
    submitBtn.onclick=function(e){
        e.preventDefault();
        let obj=createObj();
        if(!obj){
            return
        }
        todolist.push(obj);
        forms.reset();
        saveDate();
        render(filterData(type));
    }
    function createObj(){
        let id;
        if(!todolist[todolist.length-1]){
          id=1;
        }else{
            id=todolist[todolist.length-1].id+1;
        }
        let content=textBtn.value;
        let ctime=new Date().toLocaleDateString();
        let status=false;
        if(!content){
            alert('添加不能为空');
        }else{
            return {id,content,ctime,status};
        }

    }

    //存储到localStorage
    function saveDate(){
        localStorage.setItem("todolist",JSON.stringify(todolist));
    }
})