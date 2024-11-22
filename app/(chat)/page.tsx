import { cookies } from 'next/headers';

import { DEFAULT_MODEL_NAME, models } from '@/ai/models';
import { auth } from '@/auth';
import { Chat } from '@/components/custom/chat';
import SignIn from '@/components/custom/github-sign-in';
import { generateUUID } from '@/lib/utils';

export default async function Page() {
  const id = generateUUID();

  const session = await auth()
  if (!session) return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-0 rounded-md shadow-[0_0_15px_#ED155D] transition-shadow duration-300 hover:shadow-[0_0_25px_#ED155D]">
        <SignIn />
      </div>
    </div>
  )

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return <Chat key={id} id={id} selectedModelId={selectedModelId} />;
}
