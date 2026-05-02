import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log('la session: ', session)
    if (!session?.user) {
        redirect('/login')
    }

    return (
        <div className='p-5'>
            <h1 className="text-center text-2xl font-extrabold tracking-tight text-balance wrap-break-word">
                Que comience el juego, <span> {session.user.email}</span>
            </h1>
            <h2 className="mt-5 pb-2 text-2xl font-semibold tracking-tight text-secondary-foreground first:mt-0">
                Crea una quiniela o unete a una y compite
            </h2>
            <div className='flex justify-center'>
                <Tabs defaultValue="overview" className="w-100">
                    <TabsList>
                        <TabsTrigger value="overview">Unete</TabsTrigger>
                        <TabsTrigger value="analytics">Crear</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Unete a una quiniela</CardTitle>
                                <CardDescription>
                                    <Input
                                        placeholder="Ingresa código"
                                        className="mt-5 text-center tracking-widest font-mono text-lg"
                                        maxLength={6}
                                    />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center text-sm text-muted-foreground">
                                <Button className=''>Unirse</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="analytics">
                        <Card>
                            <CardHeader>
                                <CardTitle>Unete a una quiniela</CardTitle>
                                <CardDescription>
                                    <Input
                                        placeholder="Ingresa código"
                                        className="mt-5 text-center tracking-widest font-mono text-lg"
                                        maxLength={6}
                                    />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center text-sm text-muted-foreground">
                                <Button className=''>Unirse</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default page;