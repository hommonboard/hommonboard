package ru.hommonboard.service;

import java.text.MessageFormat;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.hommonboard.entity.User;
import ru.hommonboard.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    final Optional<User> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    else {
      throw new UsernameNotFoundException(
          MessageFormat.format("User with email {0} cannot be found.", email));
    }
  }
}
