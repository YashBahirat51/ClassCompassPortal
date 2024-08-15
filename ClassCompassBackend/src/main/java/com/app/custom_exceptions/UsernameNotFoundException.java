package com.app.custom_exceptions;

@SuppressWarnings("serial")
public class UsernameNotFoundException extends Exception
{
	String msg;
	public UsernameNotFoundException(String msg) {
	super(msg);
	this.msg=msg;
		// TODO Auto-generated constructor stub
	}

}
