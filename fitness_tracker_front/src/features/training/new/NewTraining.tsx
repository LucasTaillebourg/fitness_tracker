import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { DateInput, DateValue } from '@mantine/dates'
import { ExerciceForm } from './ExerciceForm'
import styles from './NewTraining.module.scss'

export interface Serie {
  machine_id: number
  weight: number
  repetitions: number
}
export interface Exercice {
  name: string
  series: Serie[]
}
export interface Training {
  date: DateValue
  name: string
  exercices: Exercice[]
}

export const NewTraining = () => {
  const form = useForm<Training>({
    initialValues: {
      date: null,
      name: '',
      exercices: [],
    },
  })

  const onSubmit = (values: Training) => {}

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className={styles.container}>
      <Stack gap='sm'>
        <TextInput
          withAsterisk
          label='Nom'
          placeholder='Nom de votre entrainement'
          {...form.getInputProps('name')}
        />
        <DateInput
          label='Date'
          placeholder="La date de l'entrainement"
          value={form.values.date}
          onChange={(val) =>
            form.setValues({
              date: val,
            })
          }
        />
        {form.values.exercices.map((item, index) => (
          <ExerciceForm exercice={item} index={index} form={form} />
        ))}
        <Group justify='center' mt='md'>
          <Button
            onClick={() =>
              form.insertListItem('exercices', {
                name: '',
                series: [],
              })
            }
          >
            Ajouter un exercice
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
