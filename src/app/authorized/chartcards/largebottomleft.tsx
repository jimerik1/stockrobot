/* eslint-disable */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";

export const LargeBottomLeft = () => {
  return (
    <Card className="col-span-3 row-span-4 flex flex-col">
      <CardHeader>
        <CardTitle>Bottom left Card</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        Bottom left Card content
      </CardContent>
    </Card>
  );
};