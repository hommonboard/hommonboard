package ru.hommonboard.controller;

import java.util.Collections;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import ru.hommonboard.Role;
import ru.hommonboard.dto.UserDto;
import ru.hommonboard.entity.User;
import ru.hommonboard.repository.UserRepository;

@Controller
public class PageController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String indexPage(Model model) {
        return "index";
    }

    @GetMapping("/signup")
    public String registration(Model model) {
        model.addAttribute("user", new UserDto());
        return "signup";
    }

    @PostMapping("/signup")
    public String addUser(@ModelAttribute("user") @Valid UserDto userDto, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "signup";
        }

        Optional<User> userFromDB = userRepository.findByName(userDto.getName());

        if (userFromDB.isPresent()) {
            model.addAttribute("userExist", "true");
            return "signup";
        } else {
            User userEntity = new User();
            userEntity.setName(userDto.getName());
            userEntity.setEmail(userDto.getEmail());
            userEntity.setRole(Role.USER);
            userEntity.setEnabled(true);
            userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
            userRepository.saveAndFlush(userEntity);
        }

        return "redirect:/login";
    }
}
