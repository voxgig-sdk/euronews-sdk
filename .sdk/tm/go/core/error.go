package core

type EuronewsError struct {
	IsEuronewsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEuronewsError(code string, msg string, ctx *Context) *EuronewsError {
	return &EuronewsError{
		IsEuronewsError: true,
		Sdk:              "Euronews",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EuronewsError) Error() string {
	return e.Msg
}
