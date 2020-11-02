<p>
    Bonjour,
</p>

<p>
    Voici le lien :
</p>
<p>
    <a href="{{ config('app.url') }}/reinitialiser-identifiants/{{ $user->email }}/{{ $user->reset_token }}">
        {{ config('app.url') }}/reinitialiser-identifiants/{{ $user->email }}/{{ $user->reset_token }}
    </a>
</p>

<p>
    Lien valable 24H.
</p>