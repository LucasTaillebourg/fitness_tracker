import { Group, Stack, TextInput } from '@mantine/core'
import { Exercice, Training } from './NewTraining'
import { UseFormReturnType } from '@mantine/form'

export interface ExerciceProps {
  exercice: Exercice
  index: number
  form: UseFormReturnType<Training, (values: Training) => Training>
}

export const ExerciceForm = ({ exercice, index, form }: ExerciceProps) => {
  return (
    <Stack key={index} mt='xs'>
      <TextInput
        label="Nom de l'exercice"
        placeholder='name'
        withAsterisk
        {...form.getInputProps(`exercice.${index}.name`)}
      />
    </Stack>
  )
}
