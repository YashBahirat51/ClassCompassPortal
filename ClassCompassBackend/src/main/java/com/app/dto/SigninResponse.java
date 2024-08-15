package com.app.dto;
public class SigninResponse {
	private String jwt;
	private String mesg;
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public String getMesg() {
		return mesg;
	}
	public void setMesg(String mesg) {
		this.mesg = mesg;
	}
	public SigninResponse(String jwt, String mesg) {
		super();
		this.jwt = jwt;
		this.mesg = mesg;
	}
	public SigninResponse() {
		
	}
}
