// import logo from './logo.svg';
import { useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { MinusSquare, UserPlus } from 'react-feather';
import classes from './MölkiTracker.module.css';

const MölkiTracker = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test'
  });

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (fields.length < 1) {
      append({ firstName: '' });
    }
  }, [fields]);

  console.log(errors);

  const formFields = fields.map((item, index) => (
    <li key={item.id}>
      <input
        className={classes.input}
        {...register(`test.${index}.firstName`, { required: true })}
      />
      {errors?.[`test.${index}.firstName`] && <span>This field is required</span>}
      {index !== 0 ? (
        <MinusSquare
          className={classes.remove}
          size={40}
          type='button'
          onClick={() => remove(index)}>
          Delete
        </MinusSquare>
      ) : null}
    </li>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <ul className={classes.formList}>
        {formFields}
        <li className={classes.formActions}>
          <UserPlus
            className={classes.add}
            size={40}
            type='button'
            onClick={() => append({ firstName: '' })}>
            append
          </UserPlus>
          <input type='submit' />
        </li>
      </ul>
    </form>
  );
};

export default MölkiTracker;
