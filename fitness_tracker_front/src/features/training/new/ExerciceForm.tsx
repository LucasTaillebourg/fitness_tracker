import { ActionIcon, Grid, NumberInput, TextInput } from '@mantine/core'
import { Exercice, Training } from './NewTraining'
import { UseFormReturnType } from '@mantine/form'
import styles from './NewTraining.module.scss'
import { IconTrash } from '@tabler/icons-react'

export interface ExerciceProps {
  exercice: Exercice
  index: number
  form: UseFormReturnType<Training, (values: Training) => Training>
}

export const ExerciceForm = ({ exercice, index, form }: ExerciceProps) => {
  return (
    <Grid grow gutter='lg' className={styles.exercice}>
      <Grid.Col span={5}>
        <TextInput
          label="Nom de l'exercice"
          placeholder='Nom'
          withAsterisk
          {...form.getInputProps(`exercices.${index}.name`)}
        />
      </Grid.Col>
      <Grid.Col span={5}>
        <NumberInput
          label='Poids'
          withAsterisk
          {...form.getInputProps(`exercices.${index}.weight`)}
        />
      </Grid.Col>
      <Grid.Col span={2} mt='lg'>
        <ActionIcon
          color='red'
          onClick={() => form.removeListItem('exercices', index)}
        >
          <IconTrash size='1rem' />
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span={5}>
        <NumberInput
          label='Répétitions'
          withAsterisk
          {...form.getInputProps(`exercices.${index}.repetitions`)}
        />
      </Grid.Col>
      <Grid.Col span={5}>
        <NumberInput
          label='Nombre de série'
          withAsterisk
          {...form.getInputProps(`exercices.${index}.series`)}
        />
      </Grid.Col>
      <Grid.Col span={2} />
    </Grid>
  )
}
