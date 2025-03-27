'use client';

import { ImgBalloons, Logo } from 'assets';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function Login() {
  const session = useSession();

  if (session.status === 'authenticated') {
    redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center items-center">
            <Image src={ImgBalloons} alt="Logo" height={220}/>
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#d53232] hover:bg-red-500">Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
