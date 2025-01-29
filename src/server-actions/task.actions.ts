'use server';

import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { verifyToken } from './auth.actions';

const prisma = new PrismaClient();


async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  const { payload } = await verifyToken(token.value);
  if (!payload || !payload.id) {
    throw new Error('Utilisateur non authentifié');
  }

  return payload.id as string;
}


async function validateTaskOwnership(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task || task.userId !== userId) {
    throw new Error('Tâche introuvable ou accès refusé');
  }

  return task;
}


function handleError(error: unknown, message: string) {
  console.error(message, (error as Error).message);
  return { error: message };
}


export async function createTask(data: { title: string; description?: string }) {
  try {
    const userId = await getAuthenticatedUser();

    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || '',
        userId,
      },
    });

    return { task };
  } catch (error) {
    return handleError(error, 'Impossible de créer la tâche');
  }
}


export async function getAllTasks() {
  try {
    const userId = await getAuthenticatedUser();

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    return { tasks };
  } catch (error) {
    return handleError(error, 'Impossible de récupérer les tâches');
  }
}


export async function updateTask(
  id: string,
  data: { title?: string; description?: string; isCompleted?: boolean }
) {
  try {
    const userId = await getAuthenticatedUser();

    await validateTaskOwnership(id, userId);

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: data.title || undefined,
        description: data.description || undefined,
        isCompleted: data.isCompleted,
      },
    });

    return { updatedTask };
  } catch (error) {
    return handleError(error, 'Impossible de mettre à jour la tâche');
  }
}


export async function deleteTask(id: string) {
  try {
    const userId = await getAuthenticatedUser();

    await validateTaskOwnership(id, userId);

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return { deletedTask };
  } catch (error) {
    return handleError(error, 'Impossible de supprimer la tâche');
  }
}
