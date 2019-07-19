// Hey Emacs, this is -*- coding: utf-8 -*-

@ObjectType()
export class Artizan implements Artizan {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field(type => [Rate])
  ratings: Rate[];

  @Field({ nullable: true })
  averageRating?: number;
}
