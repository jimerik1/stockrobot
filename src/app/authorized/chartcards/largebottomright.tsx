/* eslint-disable */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";

export const LargeBottomRight = () => {
  return (
    <Card className="col-span-3 row-span-4 flex flex-col">
      <CardHeader>
        <CardTitle>Bottom right Card</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {/* Long content here */}
        {Array(300).fill("Bottom right Card content").join(" ")}
      </CardContent>
    </Card>
  );
};