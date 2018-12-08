import { Action } from '@ngrx/store';

export const GET_TERMS = '[Course Explorer] Get Terms';
export const GET_TERMS_SUCCESS = '[Course Explorer] Get Terms Success';
export const GET_TERMS_FAILURE = '[Course Explorer] Get Terms Failure';

export class GetTerms implements Action {
  readonly type = GET_TERMS;
  constructor() {}
}

export class GetTermsSuccess implements Action {
  readonly type = GET_TERMS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetTermsFailure implements Action {
  readonly type = GET_TERMS_FAILURE;
  constructor() {}
}

export type GetTermsActions = GetTerms | GetTermsSuccess | GetTermsFailure;
