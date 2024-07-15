/* eslint-disable */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";

export const RightHandColumn = () => {
  return (
    <Card className="col-span-1 row-span-6 flex flex-col">
      <CardHeader>
        <CardTitle>Right hand column 2</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        Right hand column 2 content
      </CardContent>
    </Card>
  );
};