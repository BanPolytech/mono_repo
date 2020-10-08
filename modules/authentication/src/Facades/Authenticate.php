<?php

namespace AOSForceMonoRepo\Authentication\Facades;


class Authenticate
{
	protected $user = false;
	
    public function __construct()
	{
		$this->user = true;
	}
	
	public function setLogged($isLogged)
	{
		$this->isLogged = $isLogged;
	}
	
	public function isLogged()
	{
		return $this->user;
	}
}