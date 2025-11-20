import { StaticImageData } from "next/image";
import React, { useState, Dispatch } from "react";

import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert"

import styles from './Form.module.css';

interface QuestionProps {
  question: string,
  fld_name: string,
  images: {[key: string]: StaticImageData};
  form: [questionObj] | undefined;
  setForm: Dispatch<[questionObj] | undefined>;
}

interface ShortTextQuestionProps extends QuestionProps {
  defaultText?: string | undefined,
}

function ShortTextQuestion({question, fld_name, defaultText}: ShortTextQuestionProps) {
  return (
    <div>
      <label htmlFor={fld_name}>{question}</label>
      <input type="text" name={fld_name} value={defaultText} />
    </div>
  )
}

interface RadioQuestionProps extends QuestionProps {
  choices: {[key: string]: {[key: string]: string}}
}

function RadioQuestion({question, fld_name, images, choices, form, setForm}: RadioQuestionProps) {
  return (
    <fieldset className={styles.radio_question}>
      <legend>{question}</legend>
      {Object.keys(choices).map((choice_key) => (
        <span
          className="flex flex-row items-center mt-2"
          key={choice_key}
        >
          <input
            type="radio"
            id={choice_key}
            name={fld_name}
            value={choice_key}
            onChange={() => setQuestionValue(form, setForm, fld_name, choice_key)}
          />
          <label htmlFor={choice_key}>
            {choices[choice_key]['description']}
            {images && choice_key in images && (
              <img alt={choice_key} src={images[choice_key].src} />
            )}
          </label>
        </span>
      ))}
    </fieldset>
  )
}

// interface ColorWheelProps extends QuestionProps {

// }

function ColorWheelQuestion({ question, fld_name, form, setForm }: QuestionProps) {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  return (
    <fieldset className={styles.color_wheel}>
      <label htmlFor={fld_name}>{question}</label>
      <Wheel color={hsva} onChange={(color) => {
        const newhsva = { ...hsva, ...color.hsva }
        setHsva(newhsva);
        setQuestionValue(form, setForm, fld_name, hsvaToHex(newhsva));
        }} />
      <input
        type="text"
        id={fld_name}
        name={fld_name}
        readOnly
        value={hsvaToHex(hsva)}
        style={{borderColor: hsvaToHex(hsva)}}
      />
    </fieldset>
  );
}

interface questionObj {
  fld_nm: string,
  param_type: string,
  question: string,
  choices?: {[key: string]: {[key: string]: string}},
  value: string | undefined,
}

interface FormProps {
  questions: [questionObj] | undefined;
  onSubmit: (formData: FormData) => void;
  images: {[key: string]: {[key: string]: StaticImageData}};
  setForm: Dispatch<[questionObj] | undefined>;
}

export default function Form({ questions, onSubmit, images, setForm }: FormProps) {

  return (
    <form className={styles.form}>
      {questions && questions.map((q: questionObj) => {
        switch (q.param_type) {
          case "radio":
            if (!q.choices) return (<div />);
            return (
              <RadioQuestion
                fld_name={q.fld_nm}
                question={q.question}
                choices={q.choices}
                key={q.fld_nm}
                images={images[q.fld_nm]}
                form={questions}
                setForm={setForm}
              />
            );
          case "color_wheel":
            return (
              <ColorWheelQuestion
                fld_name={q.fld_nm}
                question={q.question}
                key={q.fld_nm}
                images={images[q.fld_nm]}
                form={questions}
                setForm={setForm}
              />
            )
          default: return (
            <ShortTextQuestion
              fld_name={q.fld_nm}
              question={q.question}
              key={q.fld_nm}
              images={images[q.fld_nm]}
              form={questions}
              setForm={setForm}
            />
          )
        }
      })}
      <input
        className={styles.submit_button}
        type="submit"
        formAction={onSubmit}
      />
    </form>
  );
}

export function getQuestionValue(form: [questionObj] | undefined, fld_nm: string) {
  if (!fld_nm || !form) return;
  const filtered = form.filter(q => q['fld_nm'] == fld_nm);
  if (filtered.length > 0) return filtered[0]['value'];
  return undefined;
}

function setQuestionValue(
  form: [questionObj] | undefined,
  setForm: Dispatch<[questionObj] | undefined>,
  fld_nm: string,
  value: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  if (!form) return undefined;
  form.forEach(q => {
    if (q['fld_nm'] == fld_nm) {
      q['value'] = value;
    }
  });
  setForm([...form]);
  return form;
}

export type {
  questionObj,
}