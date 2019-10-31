import { Directive, ElementRef, Renderer2, ViewChild, HostListener, Input } from '@angular/core';
import { MatTable } from '@angular/material';

@Directive({
  selector: '[bbwDraggableTable]'
})
export class DraggableTableDirective {

  columns: any[] = [];
  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;

  @ViewChild(MatTable, { read: ElementRef }) private matTableRef: ElementRef;

  constructor(private elem: ElementRef, private renderer: Renderer2) {
    //console.log(elem);
    this.matTableRef = elem;
    //attach events
    //Frame columns data
    //mat-header-cell cdk-column-Activity mat-column-Activity
    // const columnEls = Array.from(document.getElementsByClassName('mat-header-cell * mat-column-*'));
    // columnEls.forEach((el: HTMLDivElement) => {
    //   console.log('======================' + el);
    // });
    // let link = document.querySelector("a"); // It is the method to access the first matched element

    // link.addEventListener("click", function (event) {
    //   console.log("Redirecting Stopped");
    //   event.preventDefault();
    // });

    // // Event Listener on the paragraph element with it's logic:
    // document.getElementById("demo").addEventListener("mousedown", function (event) {
    //   alert("Paragraph clicked");
    // });
  }

  ngOnInit() {
    //this.setDisplayedColumns();
  }

  getColumnName(classNames: string) {
    let col = "";
    let classList: any[] = classNames.split(' ');
    for (let i = 0; i < classList.length; i++) {
      let value = classList[i];
      if (value != undefined && value.includes('mat-column-')) {
        //console.log('col-class=' + value);
        col = value;
        break;
      }
    }
    return col;
  }

  ngAfterViewInit() {
    let matches = this.matTableRef.nativeElement.querySelectorAll("th[mat-header-cell]");
    const columnEls = Array.from(matches);
    columnEls.forEach((el: HTMLDivElement, index) => {
      let colData: any = {};
      colData.field = this.getColumnName(el.className);
      //console.log('col-class=' + colData.field);
      colData.width = 1;
      //console.log(colData);
      this.columns.push(colData);
      el.addEventListener("mousedown", this.onResizeColumn.bind(this));
      //console.log('======================' + el.textContent);
    });
    this.setDisplayedColumns();
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  setDisplayedColumns() {
    this.columns.forEach((column, index) => {
      column.index = index;
    });
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }

  setColumnWidth(column: any) {
    //console.log('column=' + column + '=' + column.field);
    const columnEls = Array.from(this.matTableRef.nativeElement.getElementsByClassName(column.field));
    columnEls.forEach((el: HTMLDivElement) => {
      el.style.width = column.width + 'px';
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  getIndexColumns(colName): number {
    let index = 0;
    for (let i = 0; i < this.columns.length; i++) {
      let value = this.columns[i].field;
      if (value != undefined && value == colName) {
        //console.log('index in columns=' + i);
        index = i;
        break;
      }
    }
    return index;
  }

  onResizeColumn(event: any) {
    let colName = this.getColumnName(event.target.className);
    let index = this.getIndexColumns(colName);
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if ((index === 0) || (Math.abs(event.pageX - cellData.right) < cellData.width / 2 && index !== this.columns.length - 1)) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[0];
    //const cell = headerRow.children[0];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
      if (this.pressed && event.buttons) {
        const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
        const width = this.startWidth + dx;
        //console.log('width in mouseMove' + width);
        if (this.currentResizeIndex === index && width > 50) {
          this.setColumnWidthChanges(index, width);
        }
      }
    });
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove();
        this.resizableMouseup();
      }
    });
  }

  setColumnWidthChanges(index: number, width: number) {
    //console.log('index:' + index + 'this.columns[index].width' + this.columns[index].width);
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = (this.isResizingRight) ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      //console.log('newWidth in setColumnWidthChanges' + newWidth);
      if (newWidth > 50) {
        this.columns[index].width = width;
        this.setColumnWidth(this.columns[index]);
        this.columns[j].width = newWidth;
        this.setColumnWidth(this.columns[j]);
      }
    }
  }
}
