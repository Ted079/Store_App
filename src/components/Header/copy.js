const first = () => {
  <div className={styles.user} onClick={toggleClick}>
    {!currentUser ? (
      <Link
        // to={!currentUser ? ROUTES.LOGIN : ROUTES.PROFILE}
        to={ROUTES.LOGIN}
        className={styles.userLink}
      >
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${values.avatar})` }}
        />
        <div className={styles.username}>{values.name}</div>
      </Link>
    ) : (
      <>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${values.avatar})` }}
        />
        <div className={styles.username}>{values.name}</div>
        {profileMenu && (
          <div className={styles.userMenu}>
            <ul>
              <li>
                <Link to={ROUTES.PROFILE}>Profile</Link>
              </li>
              <br />
              <li>
                <Link to={ROUTES.SETTINGS}>Settings</Link>
              </li>
              <hr />
              <li>log Out</li>
            </ul>
          </div>
        )}
      </>
    )}
  </div>;
};

/////////////////////////////////////////////////

const second = () => {
  <div className={styles.user} onClick={toggleClick}>
    {!hideLayouts && (
      <Link
        // to={!currentUser ? ROUTES.LOGIN : ROUTES.PROFILE}
        to={!currentUser && ROUTES.LOGIN}
        className={styles.userLink}
      >
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${values.avatar})` }}
        />
        <div className={styles.username}>{values.name}</div>
      </Link>
    )}

    {profileMenu && (
      <div className={styles.userMenu}>
        <ul>
          <li>
            <Link to={ROUTES.PROFILE}>Profile</Link>
          </li>
          <br />
          <li>
            <Link to={ROUTES.SETTINGS}>Settings</Link>
          </li>
          <hr />
          <li>log Out</li>
        </ul>
      </div>
    )}
  </div>;
};


const third = () => {
    <div className={styles.user} onClick={toggleClick}>
          <Link
            to={!currentUser ? ROUTES.LOGIN : "#"}
            className={styles.userLink}
          >
            <div
              className={styles.avatar}
              style={{ backgroundImage: `url(${values.avatar})` }}
            />
            <div className={styles.username}>{values.name}</div>
          </Link>

          {currentUser && profileMenu && (
            <div className={styles.userMenu}>
              <ul>
                {[
                  { to: ROUTES.PROFILE, label: "Profile" },
                  { to: ROUTES.SETTINGS, label: "Settings" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
                <li>Log Out</li>
              </ul>
            </div>
          )}
        </div>
};