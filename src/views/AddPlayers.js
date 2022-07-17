import { useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { Check, MinusSquare, UserPlus } from 'react-feather';
import classes from './AddPlayers.module.css';

const AddPlayers = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'players'
  });

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (fields.length < 1) {
      append({ name: '' });
    }
  }, [fields]);

  console.log(errors);

  const formFields = fields.map((item, index) => (
    <li key={item.id}>
      <input className={classes.input} {...register(`players.${index}.name`, { required: true })} />
      {errors?.[`players.${index}.ame`] && <span>This field is required</span>}
      {index !== 0 ? (
        <MinusSquare className={classes.remove} size={40} onClick={() => remove(index)}>
          Delete
        </MinusSquare>
      ) : null}
    </li>
  ));

  const actions = (
    <li className={classes.formActions}>
      <UserPlus className={classes.add} size={40} onClick={() => append({ name: '' })}>
        append
      </UserPlus>
      <button className={classes.submit} type='submit' value=''>
        <Check size={40}></Check>
      </button>
    </li>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <ul className={classes.formList}>
        {formFields} {actions}
      </ul>
    </form>
  );
};

export default AddPlayers;
