import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { __decorate, query, listen, symbolIterator } from "cl-polymer-element-helpers/cl-helpers.js";
import { property, observe, computed } from "@polymer/decorators";

import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-tooltip/paper-tooltip.js";

import "cl-polymer-element-helpers/ct-element-style.js";

let clPolymerFormTextareaTemplate;
let clPolymerFormTextareaTemplateDefault;
let clPolymerFormTextareaBase = mixinBehaviors([], PolymerElement);
class clPolymerFormTextarea extends clPolymerFormTextareaBase {
    constructor () {
        super();
        this.disabled = false;
        this.hideLabel = false;
        this.readonly = false;
        this.required = false;
        this.truncateToCharacterLimit = false;
        this.isNewLineForbidden = false;
        this.hideInitialErrors = false;
        this.hideErrorsWhileEditing = false;
        this.hideRedOutlineWhileEditing = false;
        this.noWrap = false;
        this.truncateLabel = false;
        this.noSpellcheck = false;
        this.openHelpTooltipInPlace = false;
        this.trimWhitespace = false;
        this.forceLtrInput = false;
        this.shouldDisplayUnderContainerText = false;
        this.fieldTouchedAfterLastFocus = false;
    }

    connectedCallback () {
        super.connectedCallback();
        this.hasAttribute("aria-label") && this.updateAriaLabel()
    }
    
    onTextBlur() {
        this.isTextFocused = false;
        if (this.field && this.trimWhitespace) {
            let a = this.field.value, 
            b = a.trim();
            b !== a && this.setFieldValue(b)
        }
    }
    
    onTextFocus() {
        this.fieldTouchedAfterLastFocus = false;
        this.isTextFocused = true
    }
    
    updateAriaLabel() {
        this.textarea.setAttribute("aria-label", this.getAttribute("aria-label") || this.placeholder || this.label)
    }
    
    onDisabledChange() {
        this.classList.toggle("disabled", this.disabled)
    }
    
    onKeyPressed(event) {
        dom(event).rootTarget === this.textarea && this.isNewLineForbidden && "Enter" === event.key && event.preventDefault()
    }
    
    focus() {
        this.focusTextarea()
    }
    
    onTap( event ) {
        "help-icon" !== dom(event).rootTarget.id && this.focusTextarea()
    }
    
    focusTextarea(a) {
        void 0 === a || a ? this.textarea.select() : this.textarea.focus()
    }
    
    onTextChange(a) {
        this.setFieldValue(a.target.value)
    }
    
    setFieldValue(a) {
        this.field && (this.fieldTouchedAfterLastFocus = true,
        this.field.value = this.truncateToCharacterLimit && void 0 !== this.characterLimit && 0 <= this.characterLimit ? a.substring(0, Math.min(a.length, this.characterLimit)) : a)
    }
    
    isTextFocusedChangedForBinding() {
        this.fire("is-text-focused-changed", this.isTextFocused)
    }
    
    get textareaDir () {
        return this.forceLtrInput ? "ltr" : void 0
    }

    get hideHelpTooltip () {
        return !this.helpTooltip && !this.openHelpTooltipInPlace
    }

    get helpTooltipLinks () {
        return this.helpTooltip && this.helpTooltip.links || []
    }

    get helpTooltipParagraphs () {
        return this.helpTooltip && this.helpTooltip.paragraphs || []
    }

    get isAriaRequired () {
        return this.required ? "true" : "false"
    }

    get ariaInvalid () {
        return this.errorTipMessage ? "true" : "false"
    }

    get sectionLabel () {
        return this.required ? String(this.label) + " (required)" : this.label
    }

    get charCounter () {
        return !this.characterLimit || 0 > this.characterLimit || void 0 === this.field ? "" : (void 0 !== this.customValueLength ? this.customValueLength : void 0 === this.field.value ? 0 : Array.from(this.field.value).length) + "/" + this.characterLimit
    }

    get showError () {
        return this.customErrorMessage ? true : !this.field || this.field.isValid || this.hideInitialErrors && false === this.field.isTouched || this.hideErrorsWhileEditing && this.isTextFocused && this.fieldTouchedAfterLastFocus ? false : true
    }

    get showWarning () {
        return this.showError || !this.field ? false : this.customWarningMessage || 0 < this.field.warnings.length ? true : false
    }   

    get textAreaClassNames () {
        if (this.hideRedOutlineWhileEditing && this.isTextFocused && this.field) {
            for (let a = symbolIterator(this.field.errors), b = a.next(); !b.done; b = a.next())
                if (!b.value.warningOnFocus)
                    return "invalid";
            return this.isTextFocused ? "focused" : ""
        }
        return this.showError || this.showWarning ? "invalid" : this.isTextFocused ? "focused" : ""
    }

    get errorTipMessage () {
        if (!this.field)
                return "";
            if (this.showError)
                return 0 < this.field.errors.length && this.field.errors[0].message || this.customErrorMessage || "";
            if (this.showWarning) {
                let a, b;
                return null != (b = null == (a = this.displayedWarning) ? void 0 : a.message) ? b : ""
            }
            return ""
    }

    get displayedWarning () {
         if (this.showWarning && this.field) {
                if (0 < this.field.warnings.length)
                    return this.field.warnings[0];
                let a;
                return {
                    message: null != (a = this.customWarningMessage) ? a : ""
                }
            }
    }

    get shouldDisplayUnderContainerHtml () {
        let a;
        return void 0 !== (null == (a = this.displayedWarning) ? void 0 : a.description)
    }

    get underContainerCustomHtml() {
        let a, b;
        return null == (a = this.displayedWarning) ? void 0 : null == (b = a.description) ? void 0 : b.content
    }

  	static get template() {
    	if (void 0 === clPolymerFormTextareaTemplate || null === clPolymerFormTextareaTemplate) {

            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                    position: relative;
                } 

                :host.disabled .text-container {
                    background-color: var(--smm-spec-secondary-background-color);
                } 

                :host.disabled .text-container:hover {
                    border-color: var(--smm-container-border-color);
                } 

                :host.disabled textarea {
                    color: var(--smm-text-disabled);
                } 

                :host([readonly]) .text-container {
                    background-color: var(--smm-spec-secondary-background-color);
                } 

                :host([readonly]) textarea {
                    color: var(--smm-text-disabled);
                } 

                .text-container {
                    border: var(--smm-container-border);
                    border-radius: var(--smm-container-border-radius);
                    flex: 1;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                } 

                .text-container:hover {
                    border-color: var(--smm-icon-active);
                } 

                .focused.text-container {
                    border-color: var(--smm-focus);
                } 

                #section-label {
                    position: relative;
                    font-family: var(--smm-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--smm-primary-font-smoothing);
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    margin-top: calc(20px - var(--smm-font-caption1-baseline-top));
                    color: var(--smm-secondary-text-color);
                    margin-top: 7px;
                } 

                :host([truncate-label]) #section-label {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                } 

                #label-help-tooltip {
                    position: relative;
                    top: -2px;
                    display: inline-block;
                    vertical-align: middle;
                    margin: -3px 0 -3px 4px;
                } 

                textarea {
                    font-family: var(--smm-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--smm-primary-font-smoothing);
                    font-size: 15px;
                    line-height: 24px;
                    flex: 1;
                    color: var(--smm-form-field-color,var(--smm-primary-text-color));
                    overflow: var(--smm-form-field-overflow,auto);
                    resize: none;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    padding-top: 4px;
                    padding-bottom: 3px;
                    line-height: var(--cl-polymer-form-textarea-line-height,24px);
                } 

                textarea:focus {
                    overflow: var(--smm-form-field-focus-overflow,var(--smm-form-field-overflow,auto));
                } 

                textarea::-webkit-input-placeholder {
                    color: var(--smm-text-disabled);
                } 

                textarea::-moz-placeholder {
                    color: var(--smm-text-disabled);
                } 

                textarea::-ms-input-placeholder {
                    color: var(--smm-text-disabled);
                } 

                textarea::placeholder {
                    color: var(--smm-text-disabled);
                } 

                .char-counter {
                    font-family: var(--smm-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--smm-primary-font-smoothing);
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    color: var(--smm-secondary-text-color);
                    display: var(--smm-container-char-counter-display,block);
                    padding-top: calc(20px - var(--smm-font-caption1-baseline-top) + 1px);
                    padding-bottom: 7px;
                    text-align: right;
                    visibility: hidden;
                } 

                #section-label,
                textarea,
                .char-counter {
                    padding-left: var(--smm-form-field-horizontal-padding);
                    padding-right: var(--smm-form-field-horizontal-padding);
                } 

                :host([no-wrap]) textarea {
                    margin-left: var(--smm-form-field-horizontal-padding);
                    margin-right: var(--smm-form-field-horizontal-padding);
                    padding-left: 0;
                    padding-right: 0;
                    overflow: var(--smm-form-field-overflow,hidden);
                    white-space: nowrap;
                } 

                :host([no-wrap]) textarea:focus {
                    overflow: var(--smm-form-field-focus-overflow,var(--smm-form-field-overflow,hidden));
                } 

                .invalid.text-container,
                .warning.text-container {
                    border-color: var(--smm-primary-error-color);
                } 

                .invalid .char-counter,
                .invalid #section-label,
                .warning .char-counter,
                .warning #section-label {
                    color: var(--smm-primary-error-color);
                } 

                .focused .char-counter,
                .invalid .char-counter,
                .warning .char-counter {
                    visibility: visible;
                } 

                .focused #section-label {
                    color: var(--smm-focus);
                } 

                .under-container-message {
                    font-family: var(--smm-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--smm-primary-font-smoothing);
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    display: var(--smm-under-container-message-style-display,block);
                    padding-top: calc(16px - var(--smm-font-caption1-baseline-top));
                    padding-bottom: calc(4px - var(--smm-font-caption1-baseline-top));
                    height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--smm-secondary-text-color);
                    height: var(--smm-under-container-message-height,20px);
                } 
            </style>
            <div class$="[[textAreaClassNames]] text-container">
                <template is="dom-if" if="[[!hideLabel]]">
                    <div id="section-label" on-tap="onTap">
                        [[sectionLabel]]
                        <div id="label-help-tooltip" hidden$="[[hideHelpTooltip]]">
                            <iron-icon id="help-icon" class="help-outline-icon" aria-label=" " compact="" icon="icons:help-outline" tabindex="0"></iron-icon>
                            <paper-tooltip for="help-icon" help-context="[[helpContext]]" open-in-place="[[openHelpTooltipInPlace]]" position="top" type="explanatory">
                                <paper-tooltip-body links="[[helpTooltipLinks]]" paragraphs="[[helpTooltipParagraphs]]">
                                    <slot name="help-tooltip"></slot>
                                </paper-tooltip-body>
                            </paper-tooltip>
                        </div>
                    </div>
                    <template is="dom-if" if="[[truncateLabel]]">
                        <smm-tooltip for="section-label" truncation=""></smm-tooltip>
                    </template>
                </template>
                <textarea aria-describedby$="[[ariaDescribedby]]" aria-invalid$="[[ariaInvalid]]" aria-required$="[[isAriaRequired]]" disabled$="[[disabled]]" placeholder="[[placeholder]]" value="[[field.value]]" on-blur="onTextBlur" on-focus="onTextFocus" on-input="onTextChange" readonly$="[[readonly]]" rows="[[rows]]" spellcheck="[[!noSpellcheck]]" dir="[[textareaDir]]"></textarea>
                <div on-tap="focusTextarea" hidden="">
                    <div class="char-counter" hidden$="[[!charCounter]]">[[charCounter]]</div>
                </div>
            </div>
            <smm-form-error-tip anchor-selector="textarea" message="[[errorTipMessage]]" position="[[errorTipPosition]]"></smm-form-error-tip>
            <template is="dom-if" if="[[underContainerMessage]]">
                <div class="under-container-message" id="under-container-message">[[underContainerMessage]]</div>
                <smm-tooltip for="under-container-message" position="bottom" truncation=""></smm-tooltip>
            </template>
            <template is="dom-if" if="[[shouldDisplayUnderContainerHtml]]"></template>
            <slot name="under-container"></slot>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemp;
            if (void 0 == clPolymerFormTextareaTemplateDefault || null == clPolymerFormTextareaTemplateDefault) {
                defaultTemp = clDefaultTemplate();
                clPolymerFormTextareaTemplateDefault = defaultTemp
            }
            defaultTemp = clPolymerFormTextareaTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemp.content.cloneNode(true), template.content.firstChild);

            return clPolymerFormTextareaTemplate = template;
        }

        return clPolymerFormTextareaTemplate;
  	}
}

clPolymerFormTextarea.prototype.isTextFocusedChangedForBinding = clPolymerFormTextarea.prototype.isTextFocusedChangedForBinding;
clPolymerFormTextarea.prototype.onKeyPressed = clPolymerFormTextarea.prototype.onKeyPressed;
clPolymerFormTextarea.prototype.onDisabledChange = clPolymerFormTextarea.prototype.onDisabledChange;
clPolymerFormTextarea.prototype.updateAriaLabel = clPolymerFormTextarea.prototype.updateAriaLabel;

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "disabled", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "field", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "label", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "hideLabel", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "placeholder", 
    void 0
);

__decorate(
    [
        property({ type: Object, reflectToAttribute: true })
    ], 
    clPolymerFormTextarea.prototype, 
    "readonly", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "required", 
    void 0
);

__decorate(
    [
        property({ type: Number })
    ], 
    clPolymerFormTextarea.prototype, 
    "characterLimit", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "ariaDescribedby", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "truncateToCharacterLimit", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "underContainerMessage", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "customValueLength", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerFormTextarea.prototype, 
    "isTextFocused", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "helpTooltip", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "helpContext", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "isNewLineForbidden", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "hideInitialErrors", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "hideErrorsWhileEditing", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "hideRedOutlineWhileEditing", 
    void 0
);

__decorate(
    [
        property({ type: Object, reflectToAttribute: true })
    ], 
    clPolymerFormTextarea.prototype, 
    "noWrap", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "truncateLabel", 
    void 0
);

__decorate(
    [
        property({ type: Number })
    ], 
    clPolymerFormTextarea.prototype, 
    "rows", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "customErrorMessage", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "customWarningMessage", 
    void 0
);

__decorate(
    [
        property({ type: Object})
    ], 
    clPolymerFormTextarea.prototype, 
    "noSpellcheck", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "openHelpTooltipInPlace", 
    void 0
);

__decorate(
    [
        property({ type: Number })
    ], 
    clPolymerFormTextarea.prototype, 
    "helpIconVeType", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "trimWhitespace", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "forceLtrInput", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "shouldDisplayUnderContainerText", 
    void 0
);
__decorate(
    [
        property({ type: Object}),
        computed("forceLtrInput")
    ], 
    clPolymerFormTextarea.prototype, 
    "textareaDir", 
    null
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormTextarea.prototype, 
    "errorTipPosition", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormTextarea.prototype, 
    "fieldTouchedAfterLastFocus", 
    void 0
);

__decorate(
    [
        property({ type: Object}),
        computed("helpTooltip", "openHelpTooltipInPlace")
    ], 
    clPolymerFormTextarea.prototype, 
    "hideHelpTooltip", 
    null
);

__decorate(
    [
        property({ type: Array }),
        computed("helpTooltip")
    ], 
    clPolymerFormTextarea.prototype, 
    "helpTooltipLinks", 
    null
);

__decorate(
    [
        property({ type: Array}),
        computed("helpTooltip")
    ], 
    clPolymerFormTextarea.prototype, 
    "helpTooltipParagraphs", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("required")
    ], 
    clPolymerFormTextarea.prototype, 
    "isAriaRequired", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("errorTipMessage")
    ], 
    clPolymerFormTextarea.prototype, 
    "ariaInvalid", 
    null
);

__decorate(
    [
        property({ type: Object}),
        computed("label", "required")
    ], 
    clPolymerFormTextarea.prototype, 
    "sectionLabel", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("field", "characterLimit", "customValueLength")
    ], 
    clPolymerFormTextarea.prototype, 
    "charCounter", 
    null
);

__decorate(
    [
        property({ type: Boolean }),
        computed("field", "hideInitialErrors", "customErrorMessage", "hideErrorsWhileEditing", "fieldTouchedAfterLastFocus", "isTextFocused")
    ], 
    clPolymerFormTextarea.prototype, 
    "showError", 
    null
);

__decorate(
    [
        property({ type: Boolean }),
        computed("customWarningMessage", "field", "showError")
    ], 
    clPolymerFormTextarea.prototype, 
    "showWarning", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("field", "isTextFocused", "hideRedOutlineWhileEditing", "showError", "showWarning")
    ], 
    clPolymerFormTextarea.prototype, 
    "textAreaClassNames", 
    null
);

__decorate(
    [
        property({ type: String }),
        computed("field", "showError", "customErrorMessage", "displayedWarning", "showWarning")
    ], 
    clPolymerFormTextarea.prototype, 
    "errorTipMessage", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("customWarningMessage", "field", "showWarning")
    ], 
    clPolymerFormTextarea.prototype, 
    "displayedWarning", 
    null
);

__decorate(
    [
        property({ type: Boolean }),
        computed("displayedWarning")
    ], 
    clPolymerFormTextarea.prototype, 
    "shouldDisplayUnderContainerHtml", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("displayedWarning")
    ], 
    clPolymerFormTextarea.prototype, 
    "underContainerCustomHtml", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("disabled")
    ], 
    clPolymerFormTextarea.prototype, 
    "onDisabledChange", 
    null
);

__decorate(
    [
        property({ type: Function }),
        listen("keydown", clPolymerFormTextarea)
    ], 
    clPolymerFormTextarea.prototype, 
    "onKeyPressed", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("isTextFocused")
    ], 
    clPolymerFormTextarea.prototype, 
    "isTextFocusedChangedForBinding", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("placeholder", "label")
    ], 
    clPolymerFormTextarea.prototype, 
    "updateAriaLabel", 
    null
);

__decorate(
    [
        property({ type: HTMLTextAreaElement }),
        query("textarea")
    ], 
    clPolymerFormTextarea.prototype, 
    "textarea", 
    void 0
);

clPolymerFormTextarea = __decorate([
    customElement("cl-polymer-form-textarea")
], clPolymerFormTextarea);

export { clPolymerFormTextarea };