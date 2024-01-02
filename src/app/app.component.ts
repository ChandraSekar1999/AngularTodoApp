import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'TODOlist';

  taskObj:Task;           //Object Initiialization

  taskList:Task[]=[];               //3rd     Step    ArrayList

  originalTaskList:Task[]=[]; 
  tagsList:string[]=['work','health','market','calls','meeting','Storytime','hobbie','function','interview'];

  filterType:string='';

  selectedTag:string='';
  
  
  constructor(){     
             
    this.taskObj= new Task();

    const localData=localStorage.getItem('AppComponent');

    if(localData != null){
      this.taskList=JSON.parse(localData);
      this.originalTaskList=this.taskList
    }


  }


  setFilter(type: string){
    this.filterType=type
    this.selectedTag='';
              
              if(this.filterType=='ShowCompleted'){
                this.taskList = this.originalTaskList.filter(   m  =>   m.isCompleted   ==   true  );
              }else{
                this.taskList=this.originalTaskList;
              }
  }


  filterTag(tagName:string){

    this.selectedTag=tagName
    // declare a variable [filterData]
              const filterData= this.originalTaskList.filter((item)=>{
                  return item.tags.includes(tagName)
                });
                this.taskList=filterData;

    
  }
  createNewTask(){
    //debugger;                                                     //debegger helping to step by step  to update data  in APPLICATION (INSPECT MODE LA)
    const task=JSON.stringify(this.taskObj);
     const parseTask=JSON.parse(task);


      this.taskList.push(parseTask);
      this.originalTaskList=this.taskList                                       //finally
      localStorage.setItem('AppComponent' , JSON.stringify(this.taskList));
  }

  onComplete(){
    debugger;                                                     //debegger helping to step by step  to update data  in APPLICATION (INSPECT MODE LA)
    //const newData =this.taskList;

    this.originalTaskList=this.taskList                                         //finally
    localStorage.setItem('AppComponent' , JSON.stringify(this.taskList));
  }

  onRemove(index:number){
    debugger;                                                     //debegger helping to step by step  to update data  in APPLICATION (INSPECT MODE LA)
    this.taskList.splice(index,1);
    this.originalTaskList=this.taskList                                         //finally
    localStorage.setItem('AppComponent' , JSON.stringify(this.taskList));
  }

  getArrayFormSeparateString(value:string) :string[]{
    const arr= value.split(',');
    return arr;
  }
}


export class Task{
  taskName:string ;
  dueDate:string;
  tags:string;

  isCompleted:boolean;


  constructor(){
    this.taskName='';
    this.dueDate='';
    this.tags='';
    this.isCompleted=false;
  }
}

