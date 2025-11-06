import { prisma } from '@/lib/db';

import { Card } from '@/components/ui/card';

//import { formatDate } from '@/lib/utils';

export default async function UsersPage() {

    const users = await prisma.user.findMany({
        include: {
            accounts: true,
            sessionLogs: true,
        },
    });

    return (
        <div className='flex  justify-center flex-col items-center p-2'>
            <h1 className="text-3xl font-bold mb-2">Admin - Users</h1>
            <hr />
            <div className="container flex flex-wrap gap-2 my-2 bg-center bg-gradient-to-r from-blue-500 to-purple-500 justify-center p-4 rounded-lg">
                {users.map(user => (
                    <Card key={user.id} className="p-4">
                        <h2 className="font-bold">{user.name}</h2>
                        <p>Provider: {user.accounts[0].provider}</p>
                        <p>Session Logs:</p>
                        <ul>
                            {user.sessionLogs.map(log => (
                                <li key={log.id}>
                                    {log.action} at {log.timestamp.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>

        </div>
    )
}