import { useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { Check, Minus, UserPlus } from 'react-feather';
import classes from './AddPlayers.module.css';

const AddPlayers = (props) => {
  const { setFormData } = props;
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

  const onSubmit = (data) => {
    setFormData(data);
  };

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
        <button className={classes.remove} onClick={() => remove(index)}>
          <Minus size={40} />
        </button>
      ) : null}
    </li>
  ));

  const actions = (
    <li className={classes.formActions}>
      <button className={classes.iconButton} onClick={() => append({ name: '' })}>
        <UserPlus size={40} />
      </button>
      <button className={classes.iconButton} type='submit' value=''>
        <Check size={40} />
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
