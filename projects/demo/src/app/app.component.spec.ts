// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have the 'demo' title`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('demo');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, World!');
//   });

//   it('should toggle between dark and light themes', () => {
//     const root = document.documentElement;
//     root.setAttribute('data-theme', 'light');
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();

//     const toggle = fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement;
//     toggle.click();
//     fixture.detectChanges();
//     expect(root.getAttribute('data-theme')).toBe('dark');
//     expect(fixture.nativeElement.querySelector('.page')?.classList).toContain('dark-theme');

//     toggle.click();
//     fixture.detectChanges();
//     expect(root.getAttribute('data-theme')).toBe('light');
//     expect(fixture.nativeElement.querySelector('.page')?.classList).not.toContain('dark-theme');
//     root.removeAttribute('data-theme');
//   });
// });
