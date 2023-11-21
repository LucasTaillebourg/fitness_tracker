import { ActionIcon, Button, Group, Stack, TextInput } from '@mantine/core'
import { Exercice, Training } from './NewTraining'
import { UseFormReturnType } from '@mantine/form'
import styles from './NewTraining.module.scss'
import { IconTrash } from '@tabler/icons-react'
import { SeriesForm } from './SeriesForm'

export interface ExerciceProps {
  exercice: Exercice
  index: number
  form: UseFormReturnType<Training, (values: Training) => Training>
}

export const ExerciceForm = ({ exercice, index, form }: ExerciceProps) => {
  return (
    <div className={styles.exercice}>
      <Group key={index} mt='xs'>
        <TextInput
          label="Nom de l'exercice"
          placeholder='Nom de votre exercice'
          withAsterisk
          {...form.getInputProps(`exercices.${index}.name`)}
        />
        <ActionIcon
          color='red'
          onClick={() => form.removeListItem('exercices', index)}
        >
          <IconTrash size='1rem' />
        </ActionIcon>
      </Group>
      {form.values.exercices[index].series.map((item, serieIndex) => (
        <SeriesForm
          exerciceIndex={index}
          serie={item}
          index={serieIndex}
          form={form}
        />
      ))}
      <Group justify='center' mt='md'>
        <Button
          onClick={() =>
            form.insertListItem(`exercices.${index}.series`, {
              machine_id: '',
              weight: 0,
              repetitions: 0,
            })
          }
        >
          Ajouter une serie
        </Button>
      </Group>
    </div>
  )
}
