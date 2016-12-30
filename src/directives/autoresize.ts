import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
	selector: "ion-textarea[autoresize]" // Attribute selector
})
export class Autoresize {

	@HostListener("input", ["$event.target"])
	onInput(textArea: HTMLTextAreaElement): void {
		this.adjust();
	}
	constructor(public element: ElementRef) {
	}
	ngOnInit(): void {
		this.adjust();
	}
	adjust(): void {
		let ta = this.element.nativeElement.querySelector("textarea");
		ta.style.overflow = "hidden";
		ta.style.height = "auto";
		//ta.scrollHeight + 'px'
		ta.style.height = ta.scrollHeight === 36 ? 17 + 'px' : ta.scrollHeight + 'px';
	}

}