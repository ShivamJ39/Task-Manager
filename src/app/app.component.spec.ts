import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Task-Manager' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Task-Manager');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Task-Manager');
  });

  it('toggleActive should set task status to active if it is currently undefined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const task = { status: undefined } as Task;
    app.toggleActive(task);
    expect(task.status).toBe('active');
  });

  it('toggleActive should set task status to undefined if it is currently active', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const task = { status: 'active' } as Task;
    app.toggleActive(task);
    expect(task.status).toBeUndefined();
  });

  it('toggleCompleted should set task status to completed if it is currently undefined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const task = { status: undefined } as Task;
    app.toggleCompleted(task);
    expect(task.status).toBe('completed');
  });

  it('toggleCompleted should set task status to undefined if it is currently completed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const task = { status: 'completed' } as Task;
    app.toggleCompleted(task);
    expect(task.status).toBeUndefined();
  });
});
