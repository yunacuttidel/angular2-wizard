import { Component, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';

@Component({
  selector: 'form-wizard',
  template:
  `

<div class="card">
    <div class="card-header">
        <h5>Form wizard with Validation</h5>
        <span>Add class of <code>.form-control</code> with <code>&lt;input&gt;</code> tag</span>
        <div class="card-header-right">
            <i class="icofont icofont-rounded-down"></i>
            <i class="icofont icofont-refresh"></i>
            <i class="icofont icofont-close-circled"></i>
        </div>
    </div>
    <div class="card-block">
        <div class="row">
            <div class="col-md-12">
                <div id="wizard">
                    <section>
                        <form class="wizard-form wizard clearfix" id="example-advanced-form" action="#" role="application" novalidate="novalidate">
                            <div class="steps clearfix"><ul role="tablist">
                              
                         <!--  
                              <li role="tab" class="first current" aria-disabled="false" aria-selected="true">
                                    <a id="example-advanced-form-t-0" href="#example-advanced-form-h-0" aria-controls="example-advanced-form-p-0">
                            <span class="current-info audible">current step: </span>
                            <span class="number">1.</span>  Registration </a></li> 
                            <li role="tab" class="disabled" aria-disabled="true"><a id="example-advanced-form-t-1" href="#example-advanced-form-h-1" aria-controls="example-advanced-form-p-1"><span class="number">2.</span>  General information </a></li>
                            <li role="tab" class="disabled" aria-disabled="true"><a id="example-advanced-form-t-2" href="#example-advanced-form-h-2" aria-controls="example-advanced-form-p-2"><span class="number">3.</span>  Education </a></li>
                            <li role="tab" class="disabled last" aria-disabled="true"><a id="example-advanced-form-t-3" href="#example-advanced-form-h-3" aria-controls="example-advanced-form-p-3"><span class="number">4.</span>  Work experience </a></li>

                         -->

                        </ul></div><div class="content clearfix">
                           
                                <li class="nav-item" *ngFor="let step of steps" [ngClass]="{'active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'completed': isCompleted}">
                                     <!--   <a (click)="goToStep(step)">{{step.title}}</a>    -->
                                        <h3 id="example-advanced-form-h-0" tabindex="-1" (click)="goToStep(step)" class="title current"> {{step.title}} </h3>
                                      </li>
                          
                                                   
                        </div><div class="actions clearfix"><ul role="menu" aria-label="Pagination"><li class="disabled" aria-disabled="true"><a href="#previous" role="menuitem">Previous</a></li><li aria-hidden="false" aria-disabled="false"><a href="#next" role="menuitem">Next</a></li><li aria-hidden="true" style="display: none;"><a href="#finish" role="menuitem">Finish</a></li></ul></div></form>
                    </section>
                </div>
            </div>
        </div>
    </div>
</div>
  `
  ,
  styleUrls: ['./style.css']
 
})
export class WizardComponent implements AfterContentInit {
  @ContentChildren(WizardStepComponent)
  wizardSteps: QueryList<WizardStepComponent>;

  private _steps: Array<WizardStepComponent> = [];
  private _isCompleted: boolean = false;

  @Output()
  onStepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>();

  constructor() { }

  ngAfterContentInit() {
    this.wizardSteps.forEach(step => this._steps.push(step));
    this.steps[0].isActive = true;
  }

  get steps(): Array<WizardStepComponent> {
    return this._steps.filter(step => !step.hidden);
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get activeStep(): WizardStepComponent {
    return this.steps.find(step => step.isActive);
  }

  set activeStep(step: WizardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.onStepChanged.emit(step);
    }
  }

  public get activeStepIndex(): number {
    return this.steps.indexOf(this.activeStep);
  }

  get hasNextStep(): boolean {
    return this.activeStepIndex < this.steps.length - 1;
  }

  get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }

  public goToStep(step: WizardStepComponent): void {
    if (!this.isCompleted) {
      this.activeStep = step;
    }
  }

  public next(): void {
    if (this.hasNextStep) {
      let nextStep: WizardStepComponent = this.steps[this.activeStepIndex + 1];
      this.activeStep.onNext.emit();
      nextStep.isDisabled = false;
      this.activeStep = nextStep;
    }
  }

  public previous(): void {
    if (this.hasPrevStep) {
      let prevStep: WizardStepComponent = this.steps[this.activeStepIndex - 1];
      this.activeStep.onPrev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  public complete(): void {
    this.activeStep.onComplete.emit();
    this._isCompleted = true;
  }

}
