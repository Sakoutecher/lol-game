"use client";

import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/lib/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/lib/components/ui/table";
import Link from "next/link";
import { gamesList } from "@/lib/utils/data/gamesList";

const Home = (): ReactElement => {
  return (
    <div className="w-2/4 flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 font-medium">Welcome on <span className="font-bold text-titleHighlight">LOLGAMES</span></CardTitle>
          <CardDescription>
            Test your knowledge on the game League of Legends, battle your friends and see your score.
          </CardDescription>
        </CardHeader>
        <Separator className="w-[94%] mx-auto" />
        <CardContent className="pt-6">
          <CardDescription>
          To start a game, please click on one of available below.
            <div className="mt-4 flex gap-4 flex-wrap">
              {gamesList.map((game, idx) => {
                if (game.status === "wip" || game.status === "unavailable") {
                  return <Button key={idx} status={game.status} variant={"secondary"} disabled>{game.visualName}</Button>;
                } else {
                  return <Link key={idx} href={game.path}>
                    <Button status={game.status} variant={"secondary"}>{game.visualName}</Button>
                  </Link>;
                }
              })}
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>You can see here all of your stats on the games.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Blurry Champions
                </p>
                <p className="text-sm text-muted-foreground">
                  Youve got a streak of 5 wins in a row 🔥
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>See who is the best player.</CardDescription>
        </CardHeader>
        <Separator className="w-[94%] mx-auto" />
        <CardContent className="pt-4">
          <Tabs defaultValue="blurry-champions">
            <TabsList className="mb-2">
              {gamesList.map((game, idx) => (
                <TabsTrigger key={idx} value={game.path}>
                  {game.visualName}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="blurry-champions">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pseudo</TableHead>
                    <TableHead>Actual streak</TableHead>
                    <TableHead>Best streak</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">Anyonipolochon</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="other1">Change your password here.</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;