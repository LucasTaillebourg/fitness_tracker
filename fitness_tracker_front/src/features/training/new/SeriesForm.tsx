import { ActionIcon, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { Exercice, Serie, Training } from './NewTraining'
import { UseFormReturnType } from '@mantine/form'
import styles from './NewTraining.module.scss'
import { IconTrash } from '@tabler/icons-react'

export interface SeriesProps {
  serie: Serie
  index: number
  exerciceIndex: number
  form: UseFormReturnType<Training, (values: Training) => Training>
}

export const SeriesForm = ({
  serie,
  index,
  form,
  exerciceIndex,
}: SeriesProps) => {
  return (
    <div className={styles.exercice}>
      <Group key={index} mt='xs'>
        <TextInput
          label='Machine'
          placeholder='Machine de la serie'
          withAsterisk
          {...form.getInputProps(
            `exercices.${exerciceIndex}.series.${index}.machine_id`
          )}
        />
        <NumberInput
          label='Poids'
          placeholder='Poids de votre série'
          withAsterisk
          {...form.getInputProps(
            `exercices.${exerciceIndex}.series.${index}.weight`
          )}
        />
        <NumberInput
          label='Répétitions'
          placeholder='Nombre de répétition de votre série'
          withAsterisk
          {...form.getInputProps(
            `exercices.${exerciceIndex}.series.${index}.repetitions`
          )}
        />
        <ActionIcon
          color='red'
          onClick={() => form.removeListItem('series', index)}
        >
          <IconTrash size='1rem' />
        </ActionIcon>
      </Group>
    </div>
  )
}
